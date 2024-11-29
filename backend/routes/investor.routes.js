import express from "express";
import Investor from "../models/investor.model.js";

const router = express.Router();

// Create a new investor
router.post("/", async (req, res) => {
  try {
    const investor = new Investor(req.body);
    await investor.save();
    res.status(201).json(investor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all investors
router.get("/", async (req, res) => {
  try {
    const investors = await Investor.find();
    res.status(200).json(investors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
