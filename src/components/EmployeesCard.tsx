"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import search_image from "@/assets/search_user_1.png";
import bulk_icon from "@/assets/icons/bulk_upload.svg";
import add_employee_icon from "@/assets/icons/add_employee.svg";

interface EmployeesCardProps {
  onBulkUploadClick: () => void;
}

export default function EmployeesCard({
  onBulkUploadClick,
}: EmployeesCardProps) {
  return (
    <Card className="w-5/6 mx-auto bg-white shadow-md mt-16 py-16">
      <CardHeader>
        <div className="flex justify-center">
          <Image
            src={search_image}
            alt="Team Illustration"
            className="w-40 h-40"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Start building your team
          </h2>
          <p className="text-gray-600 mt-2">
            Add your first team member or import your entire team.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <button
          onClick={onBulkUploadClick}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 flex items-center space-x-2"
        >
          <Image src={bulk_icon} alt="Bulk Upload Icon" />
          <span>Bulk Upload</span>
        </button>
        <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 flex items-center space-x-2">
          <Image src={add_employee_icon} alt="Add Employee Icon" />
          <span>Add Employee</span>
        </button>
      </CardFooter>
    </Card>
  );
}
