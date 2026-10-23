import { beforeAll, afterAll, beforeEach, describe, expect, it } from "vitest";
import { redis } from "../infrastructure/redis/redis";
import { ProductService } from "../modules/products/product.service";

describe("ProductService", () => {
  const service = new ProductService();

  beforeAll(async () => {
    if (redis.status === "wait") {
      await redis.connect();
    }
  });

  beforeEach(async () => {
    await redis.del("shopsphere:product:101");
    await redis.del("shopsphere:product:102");
  });

  afterAll(async () => {
    await redis.quit();
  });

  it("returns a product and caches it", async () => {
    const product = await service.getProduct("101");

    expect(product).toEqual({
      id: "101",
      name: "Mechanical Keyboard",
      price: 4500,
    });

    const cached = await redis.get(
      "shopsphere:product:101",
    );

    expect(cached).not.toBeNull();
  });

  it("returns null for an unknown product", async () => {
    const product = await service.getProduct("999");

    expect(product).toBeNull();
  });

  it("sets a TTL on the cached product", async () => {
    await service.getProduct("101");

    const ttl = await redis.ttl("shopsphere:product:101");

    expect(ttl).toBeGreaterThan(0);
    expect(ttl).toBeLessThanOrEqual(60);
  });
});