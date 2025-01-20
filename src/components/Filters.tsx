interface FiltersProps {
  filters: { status: string; role: string };
  setFilters: (filters: { status: string; role: string }) => void;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  return (
    <>
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border px-4 py-2 rounded-md shadow-sm focus:outline-teal-500"
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Invite Sent">Invite Sent</option>
        <option value="Payroll Only">Payroll Only</option>
      </select>
      <select
        value={filters.role}
        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        className="border px-4 py-2 rounded-md shadow-sm focus:outline-teal-500"
      >
        <option value="All">All Roles</option>
        <option value="Senior Marketer">Senior Marketer</option>
        <option value="Lead Designer">Lead Designer</option>
        <option value="Product Manager">Product Manager</option>
      </select>
    </>
  );
}
