// scripts/insertProduct.js
//  // "insert-product": "node scripts/insertProduct.js"

import 'dotenv/config';
import mongoose from "mongoose";
import { connectDB } from "../lib/databaseConnection.js";
import ProductModel from "../models/Product.model.js";

async function insertProduct() {
  try {
    await connectDB();

    const newProduct = new ProductModel({
      name: "Clock Tower",
      slug: "clock-tower",
      category: "Building", 
      subCategory: "town-tower", // optional
      mrp: 1000,
      sellingPrice: 800,
      discountPercentage: 20,
      media: ["https://res.cloudinary.com/dxrvocvqq/image/upload/v1756742881/photo-1755066011008-1133a4020b79_p9mn6l.jpg"], // media _ids
      description: "This is a seeded product directly in DB"
    });

    await newProduct.save();
    console.log("✅ Product inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting product:", err);
    mongoose.connection.close();
  }
}

insertProduct();
