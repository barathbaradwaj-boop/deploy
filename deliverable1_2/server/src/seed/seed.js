import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany();
  await Product.insertMany([
    { name: "Product 1", price: 100, description: "Sample", stock: 10 },
    { name: "Product 2", price: 200, description: "Sample", stock: 20 }
  ]);
  console.log("✅ Data Seeded");
  process.exit();
};

seed();
