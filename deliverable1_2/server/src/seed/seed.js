import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
});

const Product = mongoose.model("Product", ProductSchema);

async function seed() {
  try {
    await mongoose.connect(process.env.DB_URL, { dbName: "fashionkart" });
    console.log("✅ DB Connected for seeding...");

    await Product.deleteMany({});
    await Product.insertMany([
      { name: "T-Shirt", price: 499, category: "Men", stock: 50 },
      { name: "Dress", price: 999, category: "Women", stock: 30 },
      { name: "Shoes", price: 799, category: "Unisex", stock: 20 },
    ]);

    console.log("🌱 Sample data inserted!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    mongoose.disconnect();
  }
}

seed();
