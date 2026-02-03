import { db } from "./db";
import {
  products,
  contactMessages,
  type Product,
  type InsertProduct,
  type InsertContactMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<void>;
  seedProducts(products: InsertProduct[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async createContactMessage(message: InsertContactMessage): Promise<void> {
    await db.insert(contactMessages).values(message);
  }

  async seedProducts(newProducts: InsertProduct[]): Promise<void> {
    const existing = await db.select().from(products);
    if (existing.length === 0) {
      await db.insert(products).values(newProducts);
    }
  }
}

export const storage = new DatabaseStorage();
