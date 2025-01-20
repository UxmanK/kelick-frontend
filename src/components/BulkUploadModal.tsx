"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import uploadIcon from "@/assets/icons/upload_icon.svg";
import excelIcon from "@/assets/icons/excel_icon.svg";

interface BulkUploadModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload: (file: File) => void;
}

export default function BulkUploadModal({
  isOpen,
  onOpenChange,
  onFileUpload,
}: BulkUploadModalProps) {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFileName(file.name);
      startUpload(file);
    }
  }, []);

  const startUpload = (file: File) => {
    setIsUploading(true);
    setProgress(0);

    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10; // Increment by 5%
      setProgress(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false); // Reset loading state
          setUploadedFileName(null); // Clear file name
          onFileUpload(file); // Trigger parent callback
          onOpenChange(false); // Close modal
        }, 1000);
      }
    }, 500); // 1-second interval
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls", ".xlsx"],
    },
    maxSize: 25 * 1024 * 1024, // 25 MB limit
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-6">
        {isUploading ? (
          <div className="mt-4">
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-4 bg-teal-500 rounded-full transition-all duration-200 ease-in-out ease-in duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              Please wait while we uplaod your file...
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Upload File</DialogTitle>
            </DialogHeader>
            <div
              {...getRootProps()}
              className={`border rounded-lg p-6 flex flex-col items-center justify-center mt-4 ease-in-out ease-in duration-500 transition-opacity duration-500 ${
                isDragActive
                  ? "border-teal-500"
                  : "border-teal-300 border-dashed"
              }`}
            >
              <input {...getInputProps()} />
              <Image
                src={uploadIcon}
                alt="Upload Icon"
                className="w-12 h-12 text-gray-400"
              />
              {uploadedFileName ? (
                <p className="text-gray-600 text-sm mt-2">
                  Selected file: {uploadedFileName}
                </p>
              ) : (
                <p className="text-gray-600 text-sm text-center">
                  Drag and drop your files here
                  <br />
                  or
                  <Button variant="link" className="ml-auto">
                    click to upload
                  </Button>
                </p>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        {!isUploading && (
          <>
            <div className="flex justify-between font-semibold mt-4">
              <p className="text-gray-600 text-xs">
                Supported formats: XLS, CSV
              </p>
              <p className="text-gray-600 text-xs">Max size: 25MB</p>
            </div>

            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
              <Image src={excelIcon} alt="Excel Icon" className="w-10 h-10" />
              <div>
                <p className="text-gray-800 font-medium">Table Example</p>
                <p className="text-gray-600 text-sm">
                  You can download the attached example and use it as a starting
                  point for your own file.
                </p>
              </div>
              <Button variant="outline" className="ml-auto">
                Download XLSX
              </Button>
            </div>
          </>
        )}

        <DialogFooter className="flex justify-end mt-6">
          {!isUploading && (
            <Button
              variant="secondary"
              onClick={() => {
                setUploadedFileName(null);
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
          )}
          {!isUploading && (
            <Button
              variant="primary"
              onClick={() => {
                if (uploadedFileName) {
                  startUpload(new File([], uploadedFileName));
                }
              }}
            >
              Continue
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
