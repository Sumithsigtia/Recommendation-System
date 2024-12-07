import express from "express";
import {
  getAllStartups,
  getStartupById,
  createStartup,
  updateStartup,
  deleteStartup,
} from "../controllers/startup.controller.js";

const router = express.Router();

router.get("/", getAllStartups);
router.get("/:id", getStartupById);
router.post("/", createStartup);
router.put("/:id", updateStartup);
router.delete("/:id", deleteStartup);

export default router;
