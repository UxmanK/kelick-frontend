interface TableRow {
  employeeId: string;
  employeeProfile: string;
  email: string;
  role: string;
  status: string;
}

interface EmployeesTableProps {
  tableData: TableRow[];
}

export default function EmployeesTable({ tableData }: EmployeesTableProps) {
  return (
    <div className="overflow-x-auto bg-white p-6 shadow-md rounded-lg">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600 border border-gray-300">
              Employee ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600 border border-gray-300">
              Employee Profile
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600 border border-gray-300">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600 border border-gray-300">
              Role
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600 border border-gray-300">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 text-gray-800 border border-gray-300">
                {row.employeeId}
              </td>
              <td className="px-4 py-2 text-gray-800 border border-gray-300">
                {row.employeeProfile}
              </td>
              <td className="px-4 py-2 text-gray-800 border border-gray-300">
                {row.email}
              </td>
              <td className="px-4 py-2 text-gray-800 border border-gray-300">
                {row.role}
              </td>
              <td className="px-4 py-2 text-gray-800 border border-gray-300">
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
