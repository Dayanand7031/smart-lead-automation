import StatusBadge from "./StatusBadge";

export default function LeadTable({ leads }) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg mt-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Country</th>
            <th className="p-3">Probability</th>
            <th className="p-3">Status</th>
            <th className="p-3">Synced</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">No leads found</td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.country || "-"}</td>
                <td className="p-3">
                  {lead.probability ? lead.probability.toFixed(2) : "-"}
                </td>
                <td className="p-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="p-3">{lead.synced ? "Yes" : "No"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
