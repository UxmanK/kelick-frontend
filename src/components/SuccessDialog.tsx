"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGeneratePayroll: () => void;
}

export default function SuccessDialog({
  isOpen,
  onClose,
  onGeneratePayroll,
}: SuccessDialogProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-md text-center">
        {/* Ensure DialogTitle is included */}
        <DialogHeader>
          <DialogTitle className="sr-only">Success Dialog</DialogTitle>{" "}
          {/* Hidden but accessible */}
          <CheckCircle className="text-center text-teal-500 w-12 h-12 mx-auto" />
          <h2 className="text-lg text-center font-semibold mt-4">
            Congrats! You’ve successfully added all your employees!
          </h2>
          <p className="text-gray-600 mt-2 text-center">
            Would you like to generate payroll?
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-center mt-6 space-x-4">
          <Button variant="secondary" onClick={onClose}>
            I’ll do it later
          </Button>
          <Button variant="primary" onClick={onGeneratePayroll}>
            Generate Payroll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
