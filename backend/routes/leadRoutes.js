import express from "express";
import { processBatch, getLeads } from "../controllers/leadController.js";

const router = express.Router();

// Health Check
router.get("/health", (req, res) => {
    res.json({ ok: true });
});

// POST - Submit batch
router.post("/batch", processBatch);

// GET - Fetch all leads
router.get("/", getLeads);

export default router;

