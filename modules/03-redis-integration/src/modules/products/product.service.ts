import { redis } from "../../infrastructure/redis/redis";

export interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  {
    id: "101",
    name: "Mechanical Keyboard",
    price: 4500,
  },
  {
    id: "102",
    name: "Wireless Mouse",
    price: 1800,
  },
];

export class ProductService {
  private readonly cachePrefix = "shopsphere:product:";

  async getProduct(id: string): Promise<Product | null> {
    const cacheKey = `${this.cachePrefix}${id}`;

    const cachedProduct = await redis.get(cacheKey);

    if (cachedProduct) {
      return JSON.parse(cachedProduct) as Product;
    }

    const product =
      products.find((item) => item.id === id) ?? null;

    if (!product) {
      return null;
    }

    await redis.set(
      cacheKey,
      JSON.stringify(product),
      "EX",
      60,
    );

    return product;
  }
}