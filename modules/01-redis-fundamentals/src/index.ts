
import { redis } from "./redis";

async function main(): Promise<void> {
  try {
    await redis.connect();

    const pong = await redis.ping();
    console.log("Redis PING:", pong);

    const key = "redis-lab:module1:hello";

    await redis.set(key, "Jai Sita Ram", "EX", 60);

    const value = await redis.get(key);
    const ttl = await redis.ttl(key);

    console.log("Stored value:", value);
    console.log("Remaining TTL:", ttl);
  } finally {
    if (redis.status !== "end") {
      redis.disconnect();
    }
  }
}

main().catch((error: unknown) => {
  console.error("Redis demo failed:", error);
  process.exitCode = 1;
});
