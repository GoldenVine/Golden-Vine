import { useQuery } from "@tanstack/react-query";
import { SiInstagram } from "react-icons/si";
import { FaHeart, FaComment } from "react-icons/fa";
import { FadeIn } from "@/components/FadeIn";

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

interface InstagramFeedResponse {
  items: InstagramMediaItem[];
}

function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k`;
  }
  return String(count);
}

async function fetchInstagramFeed(): Promise<InstagramFeedResponse> {
  const res = await fetch("/.netlify/functions/instagram");
  if (!res.ok) {
    throw new Error(`Instagram feed request failed with status ${res.status}`);
  }
  return res.json();
}

export function InstagramFeed() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["instagram-feed"],
    queryFn: fetchInstagramFeed,
    retry: false,
  });

  if (isLoading || isError || !data || data.items.length === 0) {
    return null;
  }

  return (
    <FadeIn>
      <section className="section-cream max-w-3xl mx-auto py-10 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <SiInstagram className="w-6 h-6" />
          <a
            href="https://www.instagram.com/goldenvinepiercing"
            target="_blank"
            rel="noreferrer"
            className="text-2xl font-bold font-serif no-underline hover:opacity-80 transition-opacity"
          >
            @goldenvinepiercing
          </a>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {data.items.slice(0, 9).map((item) => (
            <a
              key={item.id}
              href={item.permalink}
              target="_blank"
              rel="noreferrer"
              className="relative block aspect-square overflow-hidden rounded-lg group"
            >
              <img
                src={item.mediaType === "VIDEO" ? item.thumbnailUrl ?? item.mediaUrl : item.mediaUrl}
                alt={item.caption ?? "Instagram post"}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4 text-white text-left">
                {item.caption && (
                  <p className="text-sm leading-snug line-clamp-5 text-center">{item.caption}</p>
                )}
                <div className="flex items-center gap-4 text-sm font-semibold">
                  {item.likeCount != null && (
                    <span className="flex items-center gap-1.5">
                      <FaHeart className="w-4 h-4" />
                      {formatCount(item.likeCount)}
                    </span>
                  )}
                  {item.commentsCount != null && (
                    <span className="flex items-center gap-1.5">
                      <FaComment className="w-4 h-4" />
                      {formatCount(item.commentsCount)}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
