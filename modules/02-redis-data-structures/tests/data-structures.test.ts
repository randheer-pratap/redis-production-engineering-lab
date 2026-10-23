
import "dotenv/config";

import Redis from "ioredis";
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
} from "vitest";

describe("Module 2: Redis data structures", () => {
  const redis = new Redis(
    process.env.REDIS_URL ?? "redis://127.0.0.1:6379",
    {
      lazyConnect: true,
      connectTimeout: 3000,
      maxRetriesPerRequest: 1,
    },
  );

  const prefix = `test:module2:${process.pid}:`;

  beforeAll(async () => {
    await redis.connect();
  });

  afterAll(async () => {
    const keys = await redis.keys(`${prefix}*`);

    if (keys.length > 0) {
      await redis.del(...keys);
    }

    redis.disconnect();
  });

  it("stores and updates hash fields", async () => {
    const key = `${prefix}user`;

    await redis.hset(key, {
      name: "Randheer",
      role: "customer",
    });

    await redis.hset(key, "role", "admin");

    await expect(
      redis.hget(key, "name"),
    ).resolves.toBe("Randheer");

    await expect(
      redis.hget(key, "role"),
    ).resolves.toBe("admin");
  });

  it("maintains list ordering", async () => {
    const key = `${prefix}activity`;

    await redis.rpush(key, "Home", "Product", "Cart");

    await expect(
      redis.lrange(key, 0, -1),
    ).resolves.toEqual(["Home", "Product", "Cart"]);
  });

  it("stores unique set members", async () => {
    const key = `${prefix}visitors`;

    await redis.sadd(
      key,
      "user:101",
      "user:102",
      "user:101",
    );

    await expect(redis.scard(key)).resolves.toBe(2);
  });

  it("orders sorted set members by score", async () => {
    const key = `${prefix}leaderboard`;

    await redis.zadd(
      key,
      300, "user:101",
      200, "user:102",
      500, "user:103",
    );

    await expect(
      redis.zrevrange(key, 0, -1),
    ).resolves.toEqual([
      "user:103",
      "user:101",
      "user:102",
    ]);

    await expect(
      redis.zrevrank(key, "user:101"),
    ).resolves.toBe(1);
  });
});
