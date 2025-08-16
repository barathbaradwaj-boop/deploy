import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connect
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ DB Error:", err));

// Middlewares
app.use(express.json());

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, "../../client")));

// API Routes (example)
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Backend!" });
});

// For React/Vue it would be catch-all, but tumhara simple HTML hai
// So index.html return karna hoga:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
