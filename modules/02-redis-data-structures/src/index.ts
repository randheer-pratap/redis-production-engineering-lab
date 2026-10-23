
import "dotenv/config";
import Redis from "ioredis";

const redis = new Redis(
  process.env.REDIS_URL ?? "redis://127.0.0.1:6379",
  {
    lazyConnect: true,
    connectTimeout: 3000,
    maxRetriesPerRequest: 1,
  },
);

redis.on("error", (error: Error) => {
  console.error("[Redis]", error.message);
});

async function main(): Promise<void> {
  await redis.connect();

  try {
    // 1. String
    await redis.set(
      "product:5001:name",
      "Wireless Keyboard",
      "EX",
      300,
    );

    console.log(
      "Product:",
      await redis.get("product:5001:name"),
    );

    // 2. Hash
    await redis.hset("user:101", {
      name: "Randheer",
      email: "randheer@example.com",
      role: "customer",
    });

    console.log(
      "User:",
      await redis.hgetall("user:101"),
    );

    // 3. List
    await redis.rpush(
      "user:101:activity",
      "Home",
      "Product",
      "Cart",
    );

    console.log(
      "Activity:",
      await redis.lrange("user:101:activity", 0, -1),
    );

    // 4. Set
    await redis.sadd(
      "product:5001:visitors",
      "user:101",
      "user:102",
      "user:103",
    );

    console.log(
      "Unique visitors:",
      await redis.scard("product:5001:visitors"),
    );

    // 5. Sorted Set
    await redis.zadd(
      "leaderboard:weekly",
      300, "user:101",
      200, "user:102",
      500, "user:103",
    );

    console.log(
      "Leaderboard:",
      await redis.zrevrange(
        "leaderboard:weekly",
        0,
        -1,
        "WITHSCORES",
      ),
    );
  } finally {
    redis.disconnect();
  }
}

main().catch((error: unknown) => {
  console.error("Redis demo failed:", error);
  process.exitCode = 1;
});
