// routes/investor.routes.js
import express from "express";
import { getAllInvestors, getInvestorById } from "../controllers/investor.controller.js";

const router = express.Router();

router.get("/", getAllInvestors);
router.get("/:id", getInvestorById);

export default router;
