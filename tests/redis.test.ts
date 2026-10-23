
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import Redis from "ioredis";

describe("Module 1: Redis fundamentals", () => {
  const client = new Redis(
    process.env.REDIS_URL ?? "redis://127.0.0.1:6379",
    {
      lazyConnect: true,
      connectTimeout: 3000,
      maxRetriesPerRequest: 1,
    },
  );

  const prefix = `test:module1:${process.pid}:`;

  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    const keys = await client.keys(`${prefix}*`);

    if (keys.length > 0) {
      await client.del(...keys);
    }

    client.disconnect();
  });

  it("connects to Redis", async () => {
    await expect(client.ping()).resolves.toBe("PONG");
  });

  it("stores and retrieves a string", async () => {
    const key = `${prefix}string`;

    await client.set(key, "hello");

    await expect(client.get(key)).resolves.toBe("hello");
    await expect(client.type(key)).resolves.toBe("string");
  });

  it("expires a key", async () => {
    const key = `${prefix}expiry`;

    await client.set(key, "temporary", "PX", 1000);

    const ttl = await client.pttl(key);

    expect(ttl).toBeGreaterThan(0);
    expect(ttl).toBeLessThanOrEqual(1000);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    await expect(client.get(key)).resolves.toBeNull();
  });

  it("increments a numeric string atomically", async () => {
    const key = `${prefix}counter`;

    await expect(client.incr(key)).resolves.toBe(1);
    await expect(client.incr(key)).resolves.toBe(2);
  });
});
