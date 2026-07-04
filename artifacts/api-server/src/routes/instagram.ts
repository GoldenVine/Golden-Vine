import { Router, type IRouter } from "express";
import { GetInstagramFeedResponse } from "@workspace/api-zod";
import { getInstagramFeed, isInstagramConfigured } from "../lib/instagram";

const router: IRouter = Router();

router.get("/instagram/feed", async (req, res): Promise<void> => {
  if (!isInstagramConfigured()) {
    res.status(503).json({ error: "Instagram feed is not configured" });
    return;
  }

  try {
    const items = await getInstagramFeed();
    const data = GetInstagramFeedResponse.parse({ items });
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch Instagram feed");
    res.status(503).json({ error: "Instagram feed is temporarily unavailable" });
  }
});

export default router;
