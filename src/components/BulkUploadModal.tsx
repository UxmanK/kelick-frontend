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
import download_icon from "@/assets/icons/download_icon.svg";

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

  const startUpload = useCallback(
    (file: File) => {
      setIsUploading(true);
      setProgress(0);

      let progressValue = 0;
      const interval = setInterval(() => {
        progressValue += 10;
        setProgress(progressValue);

        if (progressValue >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadedFileName(null);
            onFileUpload(file);
            onOpenChange(false);
          }, 500);
        }
      }, 200);
    },
    [onFileUpload, onOpenChange]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFileName(file.name);
        startUpload(file);
      }
    },
    [startUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls", ".xlsx"],
    },
    maxSize: 25 * 1024 * 1024,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 gap-3 rounded-xl">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>

        <div className="transition-opacity duration-300 border-gray-300 border-dashed border rounded-lg p-8 ">
          {!isUploading ? (
            <div
              {...getRootProps()}
              className={` flex flex-col items-center justify-center mt-4 transition-opacity ${
                isDragActive
                  ? "border-gray-500"
                  : "border-gray-300 border-dashed"
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
          ) : (
            <div className="flex flex-col items-center justify-center mt-4 h-full">
              <div className="w-[183px] h-4 bg-[#F2F5F5] rounded-s-sm	overflow-hidden">
                <div
                  className="h-4 bg-[#02B9B0] rounded-s-sm transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-[#5F6969] font-semi text-xs mb-2 mt-4 text-center">
                Please wait while we upload your file...
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between font-semibold mt-4">
          <p className="text-[#5F6969] text-xs">Supported formats: XLS, CSV</p>
          <p className="text-gray-600 text-xs">Max size: 25MB</p>
        </div>

        <div className="mt-6 bg-[#F2F5F5] rounded-xl p-4 flex items-center space-x-2">
          <Image src={excelIcon} alt="Excel Icon" className="w-12 h-10" />
          <div>
            <p className="text-gray-800 font-bold">Table Example</p>
            <p className="text-gray-600 font-medium text-sm">
              You can download the attached example and use it as a starting
              point for your own file.
            </p>
          </div>
          <Button
            variant="outline"
            className="font-semibold text-sm rounded-xl bg-[#F9FCFC] border border-[#B3BEBE]"
          >
            <Image src={download_icon} alt={"download_icon"} />
            Download XLSX
          </Button>
        </div>

        <DialogFooter className="flex justify-end mt-6">
          {!isUploading && (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setUploadedFileName(null);
                  onOpenChange(false);
                }}
                className="font-semibold text-sm rounded-xl bg-[#F9FCFC] border border-[#B3BEBE]"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="font-semibold text-sm rounded-xl bg-[#02B9B0] border border-[#1A1A1A1F]"
              >
                Continue
              </Button>

              {uploadedFileName && (
                <Button
                  variant="primary"
                  onClick={() => startUpload(new File([], uploadedFileName))}
                  className="font-semibold text-sm rounded-xl bg-[#02B9B0] border border-[#1A1A1A1F]"
                >
                  Continue
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
