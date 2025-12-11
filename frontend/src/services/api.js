const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
console.log("🔥 API BASE =", API_BASE);
export const fetchLeads = async (status = "") => {
  let url = `${API_BASE}/api/leads`;
  if (status && status !== "All") {
    url += `?status=${status}`;
  }
  const res = await fetch(url);
  return res.json();
};

export const submitBatch = async (names) => {
  const res = await fetch(`${API_BASE}/api/leads/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ names }),
  });

  return res.json();
};