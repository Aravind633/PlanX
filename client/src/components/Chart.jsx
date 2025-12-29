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
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useGlobalContext } from "../context/globalContext";
import moment from "moment";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  // 1. DATA FOR AREA CHART
  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      return moment(date).format("DD/MM");
    }),
    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map((income) => {
            const { amount } = income;
            return amount;
          }),
        ],

        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "#10B981",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Expenses",
        data: [
          ...expenses.map((expense) => {
            const { amount } = expense;
            return amount;
          }),
        ],

        backgroundColor: "rgba(244, 63, 94, 0.2)",
        borderColor: "#F43F5E",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#9ca3af",
          font: { size: 11 },
        },
      },
      y: {
        grid: {
          color: "#f3f4f6",
          borderDash: [5, 5],
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  // 2. COLOR PALETTE FOR DOUGHNUT CHART
  const SOURCE_COLORS = [
    "#6C5DD3",
    "#3F8CFF",
    "#FF754C",
    "#FFA2C0",
    "#7FBA7A",
    "#FFCE73",
    "#24D1D1",
    "#8065B3",
    "#45B36B",
    "#FF5C5C",
    "#37CDBE",
    "#5D6D7E",
    "#F39C12",
    "#8E44AD",
  ];

  // 3. LOGIC FOR SPENDING BREAKDOWN
  const uniqueCategories = [...new Set(expenses.map((item) => item.category))];
  const categoryAmounts = uniqueCategories.map((cat) => {
    return expenses
      .filter((item) => item.category === cat)
      .reduce((acc, curr) => acc + curr.amount, 0);
  });

  const doughnutData = {
    labels: uniqueCategories.map(
      (cat) => cat.charAt(0).toUpperCase() + cat.slice(1)
    ),
    datasets: [
      {
        data: categoryAmounts,
        backgroundColor: SOURCE_COLORS,
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 11 },
          color: "#4b5563",
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 h-[350px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-700">Analytics</h3>
          <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
            Last 30 Days
          </span>
        </div>
        <div className="h-full w-full pb-6">
          <Line data={data} options={lineOptions} />
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">
          Spending Breakdown
        </h3>
        <div className="h-[300px] flex justify-center items-center">
          {expenses.length > 0 ? (
            <Doughnut data={doughnutData} options={doughnutOptions} />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 opacity-60">
              <p>No expenses recorded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chart;
