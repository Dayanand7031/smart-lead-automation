import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodeCron from "node-cron";

import connectDB from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js";
import Lead from "./models/Lead.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ---------- ROUTES ----------
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

app.use("/api/leads", leadRoutes);

// ---------- CRON JOB ----------
nodeCron.schedule("*/5 * * * *", async () => {
  console.log("Running CRM Sync...");

  const lead = await Lead.findOneAndUpdate(
    { status: "Verified", synced: false },
    { synced: true, syncedAt: new Date() },
    { new: true }
  );

  if (lead) {
    console.log(`[CRM Sync] Sending ${lead.name} to Sales Team...`);
  }
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
