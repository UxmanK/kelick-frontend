import HorizontalBarChart from "./HorizontalBarChart";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface InfoCardProps {
  title: string;
  value: number;
  subtitle: string;
  data: { label: string; value: number; color: string }[];
  type: "donut" | "bar" | "radialBar";
}

export default function InfoCard({
  title,
  value,
  subtitle,
  data,
  type,
}: InfoCardProps) {
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  // Donut Chart Options
  const donutChartOptions: ApexCharts.ApexOptions = {
    chart: { type: "donut" },
    labels: [],
    colors: data.map((item) => item.color),
    legend: {
      show: false, // Hide the legend
    },

    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "90%",
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  // Radial Bar Chart Options
  const semiDonutChartOptions: ApexCharts.ApexOptions = {
    chart: { type: "donut" },
    labels: [],
    colors: data.map((item) => item.color),
    legend: {
      show: false, // Hide the legend
    },

    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        startAngle: -90, // Start angle for semi-donut
        endAngle: 90, // End angle for semi-donut
        donut: {
          size: "90%",
        },
      },
    },
    tooltip: { enabled: false },
  };

  return (
    <div className={`${type === "bar" ? "" : "flex flex-row"} `}>
      {/* Card Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{`${value} ${subtitle}`}</p>
      </div>

      {/* Render Chart Based on Type */}
      {type === "donut" && (
        <ReactApexChart
          options={donutChartOptions}
          series={data.map((item) => item.value)}
          type="donut"
          height={150}
        />
      )}
      {type === "bar" && <HorizontalBarChart data={data} />}
      {type === "radialBar" && (
        <ReactApexChart
          options={semiDonutChartOptions}
          series={data.map((item) => (item.value / totalValue) * 100)}
          type="donut"
          height={150}
        />
      )}
    </div>
  );
}
