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
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const lineData = {
    labels: incomes.map((inc) => moment(inc.date).format("DD/MM")),
    datasets: [
      {
        label: "Income",
        data: incomes.map((inc) => inc.amount),
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderColor: "#34D399",
        borderWidth: 3,
        pointBackgroundColor: "#050505",
        pointBorderColor: "#34D399",
        pointBorderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: expenses.map((exp) => exp.amount),
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "#F87171",
        borderWidth: 3,
        pointBackgroundColor: "#050505",
        pointBorderColor: "#F87171",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#9CA3AF", usePointStyle: true, boxWidth: 6 },
        position: "top",
        align: "end",
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280", font: { size: 10 } },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { display: false },
        border: { display: false },
      },
    },
  };

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const doughnutColors = [
    "#8b5cf6",
    "#ec4899",
    "#10b981",
    "#f59e0b",
    "#3b82f6",
    "#ef4444",
    "#06b6d4",
    "#84cc16",
  ];

  const doughnutData = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: doughnutColors,
        borderColor: "#050505",
        borderWidth: 4,
        hoverOffset: 10,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    layout: {
      padding: 10,
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#D1D5DB",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
          font: { size: 11 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.9)",
        bodyColor: "#fff",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        cornerRadius: 10,
        callbacks: {
          label: function (context) {
            return ` ${context.label}: ₹${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-card p-6 h-[400px] flex flex-col">
        <h3 className="text-lg font-bold text-gray-200 mb-4">Analytics</h3>
        <div className="flex-1 w-full relative">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      <div className="glass-card p-6 h-[400px] flex flex-col">
        <h3 className="text-lg font-bold text-gray-200 mb-4">
          Spending Breakdown
        </h3>

        <div className="flex-1 min-h-0 w-full relative flex justify-center items-center">
          {expenses.length > 0 ? (
            <Doughnut data={doughnutData} options={doughnutOptions} />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 opacity-60">
              <p>No expenses recorded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chart;
