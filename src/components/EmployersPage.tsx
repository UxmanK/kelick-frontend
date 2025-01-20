"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import EmployeesCard from "./EmployeesCard";
import BulkUploadModal from "./BulkUploadModal";
import { Spinner } from "@/components/ui/spinner";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import EmployeesTable from "./EmployeesTable";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import Header from "./Header";
import add_employee_icon from "@/assets/icons/add_employee.svg";
import CardsSection from "./CardSection";
// import SuccessDialog from "./SuccessDialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";

const SuccessDialog = dynamic(() => import("./SuccessDialog"), {
  ssr: false,
});

interface TableRow {
  employeeId: string;
  employeeProfile: string;
  email: string;
  role: string;
  status: string;
}

export default function EmployeesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [filteredData, setFilteredData] = useState<TableRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: "All", role: "All" });

  const handleClick = () => {
    console.log("clicked");
  };

  const handleFileUpload = (file: File) => {
    setIsLoading(true);
    setIsDialogOpen(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Parse and validate the data
        const parsedData =
          XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

        if (parsedData.length === 0) {
          throw new Error("The file is empty or contains no rows.");
        }

        const formattedData = parsedData.map((row) => {
          if (
            !("Employee ID" in row) ||
            !("Employee Profile" in row) ||
            !("Email" in row) ||
            !("Role" in row) ||
            !("Status" in row)
          ) {
            throw new Error("Missing required columns in the file.");
          }

          return {
            employeeId: row["Employee ID"] as string,
            employeeProfile: row["Employee Profile"] as string,
            email: row["Email"] as string,
            role: row["Role"] as string,
            status: row["Status"] as string,
          };
        });

        setTimeout(() => {
          setTableData(formattedData);
          setFilteredData(formattedData);
          setIsLoading(false);
          toast.success("Employees successfully added!", {
            icon: <CheckCircle />,
          });
          setIsSuccessDialogOpen(true);
        }, 3000);
      } catch (error) {
        setIsLoading(false);
        toast.error(
          `Error processing the file: ${
            (error as Error).message || "Invalid file format."
          }`
        );
      }
    };
    reader.onerror = () => {
      setIsLoading(false);
      toast.error("Error reading the file. Please try again.");
    };
    reader.readAsArrayBuffer(file);
  };

  const applyFilters = (search: string, status: string, role: string) => {
    let filtered = tableData;

    if (search) {
      filtered = filtered.filter(
        (row) =>
          row.employeeId.toLowerCase().includes(search.toLowerCase()) ||
          row.employeeProfile.toLowerCase().includes(search.toLowerCase()) ||
          row.email.toLowerCase().includes(search.toLowerCase()) ||
          row.role.toLowerCase().includes(search.toLowerCase()) ||
          row.status.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "All") {
      filtered = filtered.filter((row) => row.status === status);
    }

    if (role !== "All") {
      filtered = filtered.filter((row) => row.role === role);
    }

    setFilteredData(filtered);
  };

  const handleGeneratePayroll = () => {
    setIsSuccessDialogOpen(false);
    console.log("Generating payroll...");
  };

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : tableData.length > 0 ? (
        <div className="">
          <Header
            page_name="Employees"
            buttonText="Add Employee"
            buttonIcon={add_employee_icon}
            onButtonClick={handleClick}
          />
          <div className="flex justify-end">
            <Button
              variant="secondary"
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition-colors duration-200"
            >
              <Download className="w-5 h-5 text-gray-700" />
              <span> Export</span>
            </Button>
          </div>
          <div className="">
            <CardsSection />
          </div>

          <div className="flex flex-col p-4">
            <div className="flex items-center space-x-4 justify-between">
              <h2 className="text-xl font-semibold">All Employees</h2>
              <div className="">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={(search) => {
                    setSearchTerm(search);
                    applyFilters(search, filters.status, filters.role);
                  }}
                />
                <Filters
                  filters={filters}
                  setFilters={(newFilters) => {
                    setFilters(newFilters);
                    applyFilters(
                      searchTerm,
                      newFilters.status,
                      newFilters.role
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <EmployeesTable tableData={filteredData} />
        </div>
      ) : (
        <>
          <Header page_name="Employees" />
          <EmployeesCard onBulkUploadClick={() => setIsDialogOpen(true)} />
        </>
      )}

      <BulkUploadModal
        isOpen={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
        onFileUpload={handleFileUpload}
      />

      {isSuccessDialogOpen && (
        <>
          <SuccessDialog
            isOpen={isSuccessDialogOpen}
            onClose={() => setIsSuccessDialogOpen(false)}
            onGeneratePayroll={handleGeneratePayroll}
          />
        </>
      )}
    </div>
  );
}
