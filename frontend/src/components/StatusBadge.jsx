export default function StatusBadge({ status }) {
    const color =
      status === "Verified"
        ? "bg-green-200 text-green-800"
        : "bg-yellow-200 text-yellow-800";
  
    return (
      <span className={`px-3 py-1 rounded-md text-sm font-medium ${color}`}>
        {status}
      </span>
    );
  }