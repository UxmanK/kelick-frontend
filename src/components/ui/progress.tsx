import React from "react";
import clsx from "clsx";

interface ProgressProps {
  value: number; // Percentage value for progress (0 to 100)
  className?: string; // Optional additional classes
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div
      className={clsx(
        "relative w-full h-2 bg-gray-200 rounded-full",
        className
      )}
    >
      <div
        className="absolute top-0 left-0 h-2 bg-teal-500 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
