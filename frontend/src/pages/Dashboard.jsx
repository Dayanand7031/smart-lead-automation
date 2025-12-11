import { useEffect, useState } from "react";
import { fetchLeads, submitBatch } from "../services/api";
import LeadTable from "../components/LeadTable";

export default function Dashboard() {
  const [names, setNames] = useState("");
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const loadLeads = async () => {
    const data = await fetchLeads(filter);
    setLeads(data);
  };

  useEffect(() => {
    loadLeads();
    const interval = setInterval(loadLeads, 4000);
    return () => clearInterval(interval);
  }, [filter]);

  const handleSubmit = async () => {
    if (!names.trim()) {
      alert("Please enter names.");
      return;
    }

    setLoading(true);
    await submitBatch(names);
    setNames("");
    await loadLeads();
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Smart Lead Dashboard</h1>

      {/* Input Section */}
      <textarea
        className="w-full p-3 border rounded-md shadow-sm"
        rows="2"
        placeholder="Enter names separated by commas (e.g., Peter, Aditi, Ravi)"
        value={names}
        onChange={(e) => setNames(e.target.value)}
      ></textarea>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
      >
        {loading ? "Submitting..." : "Submit Batch"}
      </button>

      {/* Filter */}
      <div className="mt-5">
        <label className="font-medium mr-2">Filter:</label>
        <select
          className="border p-2 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Verified</option>
          <option>To Check</option>
        </select>
      </div>

      {/* Table */}
      <LeadTable leads={leads} />
    </div>
  );
}
