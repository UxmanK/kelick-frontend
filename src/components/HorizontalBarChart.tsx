import React from "react";

interface BarChartData {
  label: string;
  value: number;
  color: string;
}

interface HorizontalBarChartProps {
  data: BarChartData[];
}

export default function HorizontalBarChart({ data }: HorizontalBarChartProps) {
  return (
    <>
      <div className="flex items-center space-x-1 py-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-grow h-2 rounded-full"
            style={{
              backgroundColor: item.color,
              width: `${item.value}%`,
              marginRight: index < data.length - 1 ? "4px" : "0px",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
