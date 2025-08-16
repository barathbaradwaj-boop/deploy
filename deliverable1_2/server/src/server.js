import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// connect to MongoDB
connectDB();

// middlewares
app.use(express.json());

// static frontend serve
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../../client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/index.html"));
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
