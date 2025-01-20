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
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  const semiDonutChartOptions: ApexCharts.ApexOptions = {
    chart: { type: "donut" },
    labels: [],
    colors: data.map((item) => item.color),
    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut: {
          size: "80%",
        },
      },
    },
    stroke: {
      width: 4,
      lineCap: "round",
    },
    tooltip: { enabled: false },
  };

  return (
    <div className={`${type === "bar" ? "" : "flex flex-row"} `}>
      <div className="mb-4">
        <h2 className="text-xs font-medium text-[#5F6969]">{title}</h2>
        <p className="text-4xl font-bold text-[#2E3333]">{`${value} `}</p>
        <p className="text-base font-semibold text-[#2E3333]">{`${subtitle}`}</p>
      </div>

      {type === "donut" && (
        <ReactApexChart
          options={donutChartOptions}
          series={data.map((item) => item.value)}
          type="donut"
          height={150}
          width={160}
        />
      )}
      {type === "bar" && <HorizontalBarChart data={data} />}
      {type === "radialBar" && (
        <ReactApexChart
          options={semiDonutChartOptions}
          series={data.map((item) => (item.value / totalValue) * 100)}
          type="donut"
          height={150}
          width={160}
        />
      )}
    </div>
  );
}
