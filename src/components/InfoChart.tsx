import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface InfoChartProps {
  type: "donut" | "bar" | "radialBar"; // Only these three are allowed
  labels: string[];
  series: number[];
  colors: string[];
}

export default function InfoChart({
  type,
  labels,
  series,
  colors,
}: InfoChartProps) {
  const options: ApexOptions = {
    chart: {
      type, // This will now always be one of "donut", "bar", or "radialBar"
      toolbar: { show: false },
    },
    labels,
    colors,
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: "50%",
      },
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#f2f2f2",
          strokeWidth: "97%",
        },
        dataLabels: {
          name: { show: true },
          value: { show: true },
        },
      },
    },
    legend: {
      position: "right", // Valid value
      offsetY: 0,
      offsetX: 0,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={type === "bar" ? [{ data: series }] : series}
      type={type}
      height={120}
    />
  );
}
