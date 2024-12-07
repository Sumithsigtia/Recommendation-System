import Startup from "../models/startup.model.js";

// Fetch all startups
export const getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (error) {
    console.error("Error fetching startups:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch a single startup by ID
export const getStartupById = async (req, res) => {
  try {
    const { id } = req.params;
    const startup = await Startup.findById(id);
    if (!startup) {
      return res.status(404).json({ error: "Startup not found" });
    }
    res.json(startup);
  } catch (error) {
    console.error("Error fetching startup:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new startup
export const createStartup = async (req, res) => {
  try {
    const newStartup = new Startup(req.body);
    const savedStartup = await newStartup.save();
    res.status(201).json(savedStartup);
  } catch (error) {
    console.error("Error creating startup:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing startup
export const updateStartup = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStartup = await Startup.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStartup) {
      return res.status(404).json({ error: "Startup not found" });
    }
    res.json(updatedStartup);
  } catch (error) {
    console.error("Error updating startup:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a startup
export const deleteStartup = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStartup = await Startup.findByIdAndDelete(id);
    if (!deletedStartup) {
      return res.status(404).json({ error: "Startup not found" });
    }
    res.json({ message: "Startup deleted successfully" });
  } catch (error) {
    console.error("Error deleting startup:", error);
    res.status(500).json({ error: "Server error" });
  }
};
