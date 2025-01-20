import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface TableRowData {
  employeeId: string;
  employeeProfile: string;
  email: string;
  role: string;
  status: string;
}

interface EmployeesTableProps {
  tableData: TableRowData[];
}

export default function EmployeesTable({ tableData }: EmployeesTableProps) {
  const [sortedData, setSortedData] = useState(tableData);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleSort = (key: keyof TableRowData) => {
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
  };

  const getSortIcon = (key: string) => (
    <div className="flex flex-col items-center space-y-0.5">
      <ChevronUpIcon
        className={`w-4 h-4 ${
          sortConfig?.key === key && sortConfig.direction === "asc"
            ? "text-gray-800"
            : "opacity-50"
        }`}
      />
      <ChevronDownIcon
        className={`w-4 h-4 ${
          sortConfig?.key === key && sortConfig.direction === "desc"
            ? "text-gray-800"
            : "opacity-50"
        }`}
      />
    </div>
  );

  const handleSelectAll = (checked: boolean) => {
    setIsSelectAll(checked);
    if (checked) {
      const allRowIds = new Set(sortedData.map((row) => row.employeeId));
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    const updatedSelection = new Set(selectedRows);
    if (checked) {
      updatedSelection.add(id);
    } else {
      updatedSelection.delete(id);
    }
    setSelectedRows(updatedSelection);
    setIsSelectAll(updatedSelection.size === sortedData.length);
  };

  return (
    <div className="overflow-x-auto m-4 border border-[#B3BEBE] rounded-xl ">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="bg-muted/10">
            <TableHead className="p-4">
              <Checkbox
                className="border border-[#B3BEBE]"
                aria-label="Select all"
                checked={isSelectAll}
                onCheckedChange={(isChecked) =>
                  handleSelectAll(isChecked as boolean)
                }
              />
            </TableHead>
            <TableHead
              className="p-4 text-muted-foreground text-base text-[#5F6969] font-semibold cursor-pointer"
              onClick={() => handleSort("employeeId")}
            >
              <div className="flex flex-row  justify-between">
                <span>Employee ID</span>
                {getSortIcon("employeeId")}
              </div>
            </TableHead>
            <TableHead
              className="p-4 text-muted-foreground text-base text-[#5F6969] font-semibold cursor-pointer"
              onClick={() => handleSort("employeeProfile")}
            >
              <div className="flex flex-row  justify-between">
                <span>Employee Profile</span>
                {getSortIcon("employeeProfile")}
              </div>
            </TableHead>
            <TableHead
              className="p-4 text-muted-foreground text-base text-[#5F6969] font-semibold cursor-pointer"
              onClick={() => handleSort("email")}
            >
              <div className="flex flex-row  justify-between">
                <span>Email</span>
                {getSortIcon("email")}
              </div>
            </TableHead>
            <TableHead
              className="p-4 text-muted-foreground text-base text-[#5F6969] font-semibold cursor-pointer"
              onClick={() => handleSort("role")}
            >
              <div className="flex flex-row  justify-between">
                <span>Role</span>
                {getSortIcon("role")}
              </div>
            </TableHead>
            <TableHead
              className="p-4 text-muted-foreground text-base text-[#5F6969] font-semibold cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex flex-row  justify-between">
                <span>Status</span>
                {getSortIcon("status")}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedData.map((row) => (
            <TableRow
              key={row.employeeId}
              className={`font-semibold text-sm ${
                selectedRows.has(row.employeeId) ? "bg-[#F9FCFC]" : "bg-white"
              } hover:bg-muted/20`}
            >
              <TableCell className="p-4">
                <Checkbox
                  className="border border-[#B3BEBE]"
                  aria-label={`Select ${row.employeeId}`}
                  checked={selectedRows.has(row.employeeId)}
                  onCheckedChange={(isChecked) =>
                    handleRowSelect(row.employeeId, isChecked as boolean)
                  }
                />
              </TableCell>

              <TableCell className="p-4 font-medium text-primary underline text-[#02B9B0]">
                <a href="#" className="hover:underline">
                  {row.employeeId}
                </a>
              </TableCell>

              <TableCell className="p-4 flex items-center space-x-2 ">
                <span className="w-8 h-8 bg-muted border border-[#B3BEBE] rounded-full"></span>
                <span>{row.employeeProfile}</span>
              </TableCell>

              <TableCell className="p-4 truncate max-w-[200px]">
                {row.email}
              </TableCell>

              <TableCell className="p-4">{row.role}</TableCell>

              <TableCell className="p-4">
                {row.status === "Active" && (
                  <span className="inline-flex gap-3 items-center px-3 py-1 text-base font-semibold bg-[#E2FFFD] text-[#02B9B0] rounded-full">
                    <span className="rounded-full w-2 h-2 bg-[#02B9B0]"></span>
                    Active
                  </span>
                )}
                {row.status === "Payroll Only" && (
                  <span className="inline-flex gap-3 items-center px-3 py-1 text-base font-semibold bg-gray-100 text-gray-600 rounded-full">
                    <span className="rounded-full w-2 h-2 bg-[#5F6969]"></span>
                    Payroll Only
                  </span>
                )}
                {row.status === "Invite Sent" && (
                  <span className="inline-flex gap-3 items-center px-3 py-1 text-base font-semibold bg-purple-100 text-[#8318E7] rounded-full">
                    <span className="rounded-full w-2 h-2 bg-[#8318E7]"></span>
                    Invite Sent
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
