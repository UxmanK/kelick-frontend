"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import add_employee_icon from "@/assets/icons/add_employee.svg";

interface HeaderProps {
  page_name: string;
  buttonText?: string;
  buttonIcon?: React.ElementType;
  onButtonClick?: () => void;
}

export default function Header({
  page_name,
  buttonText,
  buttonIcon: ButtonIcon,
  onButtonClick,
}: HeaderProps) {
  return (
    <Card className="flex flex-row items-center bg-white justify-between p-4">
      <CardHeader className="">
        <h1 className="text-gray-700 text-3xl font-bold">{page_name}</h1>
      </CardHeader>
      <div>
        {buttonText && onButtonClick && (
          <Button
            variant="primary"
            onClick={onButtonClick}
            className="flex items-center space-x-2"
          >
            {ButtonIcon && (
              <Image src={add_employee_icon} alt="Add Employee Icon" />
            )}
            <span>{buttonText}</span>
          </Button>
        )}
      </div>
    </Card>
  );
}
