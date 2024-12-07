import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import investorRoutes from "./routes/investor.routes.js";
import startupRoutes from "./routes/startup.routes.js";
import recommendationRoutes from "./routes/recommendation.routes.js"; // Import recommendation routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/investors", investorRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/recommendations", recommendationRoutes); // Add recommendation routes

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
