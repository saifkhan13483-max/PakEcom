import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactMessage(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const seedProducts = [
    {
      name: "Premium Cotton Kurta",
      slug: "premium-cotton-kurta",
      description: "High-quality cotton kurta perfect for summer.",
      price: 2500,
      originalPrice: 3000,
      category: "Fashion",
      image: "https://placehold.co/600x800?text=Kurta",
      inStock: true,
      features: ["100% Cotton", "Traditional Fit", "Machine Washable"]
    },
    {
      name: "Peshawari Chappal",
      slug: "peshawari-chappal",
      description: "Handcrafted leather chappal in classic black.",
      price: 3500,
      originalPrice: 4000,
      category: "Footwear",
      image: "https://placehold.co/600x800?text=Chappal",
      inStock: true,
      features: ["Genuine Leather", "Hand Stitched", "Comfortable Sole"]
    },
    {
      name: "Wireless Earbuds",
      slug: "wireless-earbuds",
      description: "Crystal clear sound with long battery life.",
      price: 4500,
      originalPrice: 6000,
      category: "Electronics",
      image: "https://placehold.co/600x800?text=Earbuds",
      inStock: true,
      features: ["Active Noise Cancellation", "24h Battery", "Bluetooth 5.3"]
    },
    {
      name: "Smart Watch",
      slug: "smart-watch",
      description: "Fitness tracker with heart rate monitor.",
      price: 5500,
      category: "Electronics",
      image: "https://placehold.co/600x800?text=Watch",
      inStock: true,
      features: ["Heart Rate Monitor", "Step Counter", "Sleep Tracking"]
    }
  ];

  await storage.seedProducts(seedProducts);
}
