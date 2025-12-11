import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: String,
  country: String,
  probability: Number,
  status: String,
  synced: { type: Boolean, default: false },
  syncedAt: { type: Date, default: null },
});

export default mongoose.model("Lead", leadSchema);
