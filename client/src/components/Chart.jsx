// import React from "react";
// import {
//   Chart as ChartJs,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   Filler, // Import Filler for gradient area
// } from "chart.js";
// import { Line, Doughnut } from "react-chartjs-2";
// import { useGlobalContext } from "../context/globalContext";
// import moment from "moment";

// // Register all necessary Chart.js components
// ChartJs.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   Filler
// );

// function Chart() {
//   const { incomes, expenses } = useGlobalContext();

//   // --- 1. DATA PREPARATION FOR LINE CHART (History) ---
//   // We sort data by date to ensure the line goes forward in time
//   const sortedIncomes = [...incomes].sort(
//     (a, b) => new Date(a.date) - new Date(b.date)
//   );
//   const sortedExpenses = [...expenses].sort(
//     (a, b) => new Date(a.date) - new Date(b.date)
//   );

//   // Create a unique set of dates from both incomes and expenses for the X-axis
//   const allDates = [
//     ...new Set([
//       ...sortedIncomes.map((inc) => moment(inc.date).format("DD/MM")),
//       ...sortedExpenses.map((exp) => moment(exp.date).format("DD/MM")),
//     ]),
//   ].sort((a, b) => moment(a, "DD/MM").toDate() - moment(b, "DD/MM").toDate());

//   const lineData = {
//     labels: allDates,
//     datasets: [
//       {
//         label: "Income",
//         data: allDates.map((date) => {
//           const inc = sortedIncomes.find(
//             (i) => moment(i.date).format("DD/MM") === date
//           );
//           return inc ? inc.amount : 0; // If no income on that day, return 0
//         }),
//         backgroundColor: "rgba(34, 197, 94, 0.2)", // Green gradient
//         borderColor: "rgba(34, 197, 94, 1)", // Solid Green
//         tension: 0.4, // Makes lines curvy/smooth
//         fill: true, // Fills area under line
//         pointRadius: 4,
//         pointHoverRadius: 6,
//       },
//       {
//         label: "Expenses",
//         data: allDates.map((date) => {
//           const exp = sortedExpenses.find(
//             (e) => moment(e.date).format("DD/MM") === date
//           );
//           return exp ? exp.amount : 0;
//         }),
//         backgroundColor: "rgba(239, 68, 68, 0.2)", // Red gradient
//         borderColor: "rgba(239, 68, 68, 1)", // Solid Red
//         tension: 0.4,
//         fill: true,
//         pointRadius: 4,
//         pointHoverRadius: 6,
//       },
//     ],
//   };

//   // --- 2. DATA PREPARATION FOR DOUGHNUT CHART (Categories) ---
//   // Group expenses by category
//   const categoryTotals = expenses.reduce((acc, curr) => {
//     const cat = curr.category;
//     acc[cat] = (acc[cat] || 0) + curr.amount;
//     return acc;
//   }, {});

//   const doughnutData = {
//     labels: Object.keys(categoryTotals), // e.g., ['Food', 'Rent', 'Investments']
//     datasets: [
//       {
//         data: Object.values(categoryTotals), // e.g., [500, 1000, 200]
//         backgroundColor: [
//           "#8b5cf6", // Violet
//           "#ec4899", // Pink
//           "#f59e0b", // Amber
//           "#10b981", // Emerald
//           "#3b82f6", // Blue
//           "#6366f1", // Indigo
//           "#ef4444", // Red
//           "#14b8a6", // Teal
//         ],
//         hoverOffset: 10, // Expands when hovered
//         borderWidth: 0,
//       },
//     ],
//   };

//   return (
//     <div className="flex flex-col gap-6 h-full">
//       {/* Chart 1: Line Chart (Income vs Expense) */}
//       <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-5 flex-1">
//         <h3 className="font-bold text-gray-700 mb-4">
//           Cash Flow (Income vs Expenses)
//         </h3>
//         <div className="h-[250px] w-full">
//           <Line
//             data={lineData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: { legend: { position: "top" } },
//               scales: {
//                 y: { beginAtZero: true, grid: { display: false } },
//                 x: { grid: { display: false } },
//               },
//             }}
//           />
//         </div>
//       </div>

//       {/* Chart 2: Doughnut Chart (Spending Breakdown) */}
//       <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-5 flex-1">
//         <h3 className="font-bold text-gray-700 mb-4">
//           Spending & Investment Breakdown
//         </h3>
//         <div className="h-[200px] w-full flex justify-center">
//           {Object.keys(categoryTotals).length > 0 ? (
//             <Doughnut
//               data={doughnutData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: { legend: { position: "right" } },
//               }}
//             />
//           ) : (
//             <p className="text-gray-400 flex items-center justify-center h-full text-sm">
//               Add expenses to see category breakdown
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chart;

import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement, // <--- Import BarElement
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2"; // <--- Change Line to Bar
import { useGlobalContext } from "../context/globalContext";
import moment from "moment";

// Register components
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // <--- Register it
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  // --- 1. DATA PROCESSING ---
  const sortedIncomes = [...incomes].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Get unique dates for X-Axis
  const allDates = [
    ...new Set([
      ...sortedIncomes.map((inc) => moment(inc.date).format("DD/MM")),
      ...sortedExpenses.map((exp) => moment(exp.date).format("DD/MM")),
    ]),
  ].sort((a, b) => moment(a, "DD/MM").toDate() - moment(b, "DD/MM").toDate());

  // --- 2. BAR CHART CONFIG (Replaces Line Graph) ---
  const barData = {
    labels: allDates,
    datasets: [
      {
        label: "Income",
        data: allDates.map((date) => {
          const inc = sortedIncomes.find(
            (i) => moment(i.date).format("DD/MM") === date
          );
          return inc ? inc.amount : 0;
        }),
        backgroundColor: "#22c55e", // Solid Green
        borderRadius: 5, // Rounded corners on bars
        barThickness: 20, // Clean thin bars
      },
      {
        label: "Expense",
        data: allDates.map((date) => {
          const exp = sortedExpenses.find(
            (e) => moment(e.date).format("DD/MM") === date
          );
          return exp ? exp.amount : 0;
        }),
        backgroundColor: "#ef4444", // Solid Red
        borderRadius: 5,
        barThickness: 20,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "#f3f4f6", // Very subtle grid lines
        },
        border: { display: false }, // Remove Y-axis line
      },
      x: {
        grid: { display: false }, // Remove X-axis grid
        border: { display: false },
      },
    },
  };

  // --- 3. DOUGHNUT CHART CONFIG ---
  const categoryTotals = expenses.reduce((acc, curr) => {
    const cat = curr.category;
    acc[cat] = (acc[cat] || 0) + curr.amount;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#8b5cf6",
          "#ec4899",
          "#f59e0b",
          "#10b981",
          "#3b82f6",
          "#6366f1",
          "#ef4444",
          "#14b8a6",
        ],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* CHART 1: Modern Bar Chart */}
      <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6 flex-1">
        <h3 className="font-bold text-gray-700 mb-4 text-lg">Cash Flow</h3>
        <div className="h-[280px] w-full">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* CHART 2: Doughnut Breakdown */}
      <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6 flex-1">
        <h3 className="font-bold text-gray-700 mb-4 text-lg">
          Spending Breakdown
        </h3>
        <div className="h-[220px] w-full flex justify-center">
          {Object.keys(categoryTotals).length > 0 ? (
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "right" } },
              }}
            />
          ) : (
            <p className="text-gray-400 flex items-center justify-center h-full text-sm">
              Add expenses to see analysis
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chart;
