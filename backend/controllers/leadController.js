import axios from "axios";
import Lead from "../models/Lead.js";


// Fetch nationality
const fetchNationality = async (name) => {
  try {
    const res = await axios.get("https://api.nationalize.io", {
      params: { name },
    });

    return res.data;
  } catch (err) {
    return null;
  }
};

export const processBatch = async (req, res) => {
  try {
    let { names } = req.body;
    if (!names) return res.status(400).json({ msg: "Names required" });

    const nameList = names.split(",").map((n) => n.trim());

    const results = [];

    for (const name of nameList) {
      const data = await fetchNationality(name);

      let country = null;
      let prob = null;

      if (data?.country?.length > 0) {
        const top = data.country.reduce((a, b) =>
          a.probability > b.probability ? a : b
        );
        country = top.country_id;
        prob = top.probability;
      }

      const status = prob >= 0.6 ? "Verified" : "To Check";

      const lead = await Lead.create({
        name,
        country,
        probability: prob,
        status,
      });

      results.push(lead);
    }

    res.json({ success: true, data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};



export const getLeads = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
