import express from "express";
import { getRecommendations } from "../controllers/recommendation.controller.js";

const router = express.Router();

// Route to get recommendations for a specific investor
router.get("/:investorId", getRecommendations);

export default router;
