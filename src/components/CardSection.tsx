import InfoCard from "./InfoCard";

const cardData = [
  {
    title: "Nationality",
    value: 25,
    subtitle: "Singaporeans",
    data: [
      { label: "Singaporean", value: 25, color: "#02B9B0" },
      { label: "PR", value: 10, color: "#fac905" },
      { label: "Foreigner", value: 10, color: "#b774FC" },
      { label: "Others", value: 6, color: "#B3bebe" },
    ],
    type: "donut", // Correctly typed as "donut"
  },
  {
    title: "Employment Type",
    value: 13,
    subtitle: "Full Timers",
    data: [
      { label: "Full-Time", value: 25, color: "#02B9B0" },
      { label: "Part-Time", value: 10, color: "#fac905" },
      { label: "Contract", value: 5, color: "#b774FC" },
      { label: "Intern", value: 6, color: "#B3bebe" },
    ],
    type: "bar", // Correctly typed as "bar"
  },
  {
    title: "Employee Status",
    value: 25,
    subtitle: "Active Employees",
    data: [
      { label: "Active", value: 25, color: "#02B9B0" },
      { label: "Invite Sent", value: 10, color: "#fac905" },
      { label: "Payroll Only", value: 6, color: "#b774FC" },
    ],
    type: "radialBar", // Correctly typed as "radialBar"
  },
];

export default function InfoCardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardData.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6">
          <InfoCard
            key={index}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            data={item.data}
            type={item.type as "donut" | "bar" | "radialBar"} // Force the type
          />
          <div className="mt-4 flex justify-between text-sm items-end">
            {item.data.map((item, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span
                  style={{ backgroundColor: item.color }}
                  className="inline-block  h-4 rounded px-1"
                ></span>
                <span className="text-sm text-gray-600">
                  <span className="font-semibold">{item.value}</span>{" "}
                  <span>{item.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
