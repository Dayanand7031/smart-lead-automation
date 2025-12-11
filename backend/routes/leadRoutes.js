import express from "express";
import { processBatch, getLeads } from "../controllers/leadController.js";

const router = express.Router();

// POST - Submit batch
router.post("/batch", processBatch);

// GET - Fetch all leads
router.get("/", getLeads);

export default router;

