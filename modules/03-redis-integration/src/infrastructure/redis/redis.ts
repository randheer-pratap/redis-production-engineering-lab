import Redis from "ioredis";
import { env } from "../../config/env";

export const redis = new Redis(env.redisUrl, {
  lazyConnect: true,
  connectTimeout: 3000,
  maxRetriesPerRequest: 1,
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error.message);
});

redis.on("connect", () => {
  console.log("Redis connection established");
});

redis.on("ready", () => {
  console.log("Redis is ready to accept commands");
});

redis.on("close", () => {
  console.warn("Redis connection closed");
});