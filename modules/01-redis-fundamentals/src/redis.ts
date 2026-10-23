
import "dotenv/config";
import Redis from "ioredis";

const redisUrl =
  process.env.REDIS_URL ?? "redis://127.0.0.1:6379";

export const redis = new Redis(redisUrl, {
  lazyConnect: true,
  connectTimeout: 3000,
  maxRetriesPerRequest: 1,
});

redis.on("error", (error: Error) => {
  console.error("[Redis] Connection/client error:", error.message);
});
