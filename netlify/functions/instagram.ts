const GRAPH_API_BASE = "https://graph.instagram.com";
const CACHE_TTL_MS = 15 * 60 * 1000;
const TOKEN_REFRESH_MARGIN_MS = 7 * 24 * 60 * 60 * 1000;

interface InstagramMediaItem {
  id: string;
  caption: string | null;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl: string | null;
  permalink: string;
  timestamp: string;
  likeCount: number | null;
  commentsCount: number | null;
}

interface RawMediaItem {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

let currentToken: string | undefined = process.env.INSTAGRAM_ACCESS_TOKEN;
let tokenRefreshedAt = Date.now();

let cachedFeed: InstagramMediaItem[] | null = null;
let cachedAt = 0;
let inFlightFetch: Promise<InstagramMediaItem[]> | null = null;

async function refreshTokenIfNeeded(): Promise<void> {
  if (!currentToken) return;
  const age = Date.now() - tokenRefreshedAt;
  if (age < TOKEN_REFRESH_MARGIN_MS) return;

  const url = `${GRAPH_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(currentToken)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Instagram token refresh failed with status ${res.status}`);
      return;
    }
    const data = (await res.json()) as { access_token: string };
    currentToken = data.access_token;
    tokenRefreshedAt = Date.now();
    console.log("Instagram access token refreshed");
  } catch (err) {
    console.error("Error refreshing Instagram access token", err);
  }
}

async function fetchFeedFromInstagram(): Promise<InstagramMediaItem[]> {
  if (!currentToken) {
    throw new Error("INSTAGRAM_ACCESS_TOKEN is not configured");
  }

  await refreshTokenIfNeeded();

  const fields =
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count";
  const url = `${GRAPH_API_BASE}/me/media?fields=${fields}&access_token=${encodeURIComponent(currentToken)}&limit=12`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Instagram API request failed with status ${res.status}: ${body}`);
  }

  const data = (await res.json()) as { data: RawMediaItem[] };

  return data.data.map((item) => ({
    id: item.id,
    caption: item.caption ?? null,
    mediaType: item.media_type,
    mediaUrl: item.media_url,
    thumbnailUrl: item.thumbnail_url ?? null,
    permalink: item.permalink,
    timestamp: item.timestamp,
    likeCount: item.like_count ?? null,
    commentsCount: item.comments_count ?? null,
  }));
}

async function getInstagramFeed(): Promise<InstagramMediaItem[]> {
  const now = Date.now();

  if (cachedFeed && now - cachedAt < CACHE_TTL_MS) {
    return cachedFeed;
  }

  if (inFlightFetch) {
    return inFlightFetch;
  }

  inFlightFetch = fetchFeedFromInstagram()
    .then((items) => {
      cachedFeed = items;
      cachedAt = Date.now();
      return items;
    })
    .catch((err) => {
      if (cachedFeed) {
        console.warn("Instagram feed refresh failed, serving stale cache", err);
        return cachedFeed;
      }
      throw err;
    })
    .finally(() => {
      inFlightFetch = null;
    });

  return inFlightFetch;
}

interface HandlerEvent {
  httpMethod: string;
}

interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

export const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  if (!currentToken) {
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Instagram feed is not configured" }),
    };
  }

  try {
    const items = await getInstagramFeed();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
      body: JSON.stringify({ items }),
    };
  } catch (err) {
    console.error("Failed to fetch Instagram feed", err);
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Instagram feed is temporarily unavailable" }),
    };
  }
};
