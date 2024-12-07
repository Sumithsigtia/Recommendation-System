// controllers/investor.controller.js

import Investor from "../models/investor.model.js";

export const getAllInvestors = async (req, res) => {
  try {
    const investors = await Investor.find();
    res.json(investors);
  } catch (error) {
    console.error("Error fetching investors:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getInvestorById = async (req, res) => {
  try {
    const { id } = req.params;
    const investor = await Investor.findById(id);
    if (!investor) {
      return res.status(404).json({ error: "Investor not found" });
    }
    res.json(investor);
  } catch (error) {
    console.error("Error fetching investor:", error);
    res.status(500).json({ error: "Server error" });
  }
};
