// client/src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import Chart from "../components/Chart";
import PlanXImg from "../assets/planX-Logo.jpeg";
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  LogOut,
  LayoutDashboard,
  PieChart,
  Plus,
} from "lucide-react";
import moment from "moment";

// NOTE: Images in 'public' folder are referenced via string path "/filename.ext"

function Dashboard() {
  const [active, setActive] = useState(1);
  const { getIncomes, error, setError } = useGlobalContext();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    getIncomes();
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const menuItems = [
    { id: 1, title: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: 2, title: "Incomes", icon: <TrendingUp size={20} /> },
    { id: 3, title: "Expenses", icon: <TrendingDown size={20} /> },
    { id: 4, title: "Investments", icon: <PieChart size={20} /> },
  ];

  const displayData = () => {
    switch (active) {
      case 1:
        return <DashboardOverview />;
      case 2:
        return <IncomeView />;
      case 3:
        return <ExpenseView />;
      case 4:
        return <InvestmentView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 font-sans overflow-hidden">
      {/* --- SIDEBAR --- */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-xl z-10 justify-between">
        <div>
          {/* --- LOGO SECTION --- */}
          <div className="mb-10">
            {/* 1. Main Logo & Name */}
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
              <img
                src={PlanXImg}
                alt="PlanX Logo"
                className="w-16 h-16 rounded-lg object-contain"
              />
              <span className="tracking-tight">
                <span className="text-gray-800">Plan</span>
                <span className="text-violet-600">X</span>
              </span>
            </h1>

            {/* 2. Animated Caption */}
            <div className="flex gap-1 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-2">
              <span className="animate-[pulse_3s_ease-in-out_infinite]">
                Manage
              </span>
              <span className="text-violet-400">•</span>
              <span className="animate-[pulse_3s_ease-in-out_infinite] delay-700">
                Monitor
              </span>
              <span className="text-violet-400">•</span>
              <span className="animate-[pulse_3s_ease-in-out_infinite] delay-1000">
                Grow
              </span>
            </div>
          </div>

          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setError(null);
                }}
                className={`cursor-pointer font-medium text-lg p-3 rounded-xl transition-all flex items-center gap-3
                                    ${
                                      active === item.id
                                        ? "bg-violet-100 text-violet-700"
                                        : "text-gray-600 hover:text-violet-600 hover:bg-violet-50"
                                    }
                                `}
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div>
              <p className="font-bold text-gray-800">{user?.name || "User"}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-medium w-full"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-8 overflow-y-auto bg-[#fbfcff]">
        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center font-bold animate-bounce">
            {error}
          </p>
        )}
        {displayData()}
      </main>
    </div>
  );
}

// ==========================================
// 1. DASHBOARD OVERVIEW COMPONENT (FIXED LAYOUT)
// ==========================================
const DashboardOverview = () => {
  const { totalIncome, totalExpenses, totalBalance, transactionHistory } =
    useGlobalContext();
  const [formType, setFormType] = useState("expense");

  return (
    <div className="flex flex-col gap-8 pb-10">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-violet-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform">
          <h3 className="text-lg opacity-90">Total Balance</h3>
          <p className="text-4xl font-bold mt-2">₹{totalBalance()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 flex items-center gap-2">
            <TrendingUp size={18} /> Total Income
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            +₹{totalIncome()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-red-500">
          <h3 className="text-gray-500 flex items-center gap-2">
            <TrendingDown size={18} /> Total Expenses
          </h3>
          <p className="text-2xl font-bold text-red-600 mt-2">
            -₹{totalExpenses()}
          </p>
        </div>
      </div>

      {/* Chart & Form Section */}
      <div className="grid grid-cols-5 gap-8">
        {/* Chart Area - Auto Height to fit both charts */}
        <div className="col-span-3 h-auto">
          <Chart />
        </div>

        {/* Form Area with Toggle */}
        <div className="col-span-2">
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-violet-800">Quick Add</h3>
              {/* Toggle Buttons */}
              <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setFormType("expense")}
                  className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${
                    formType === "expense"
                      ? "bg-red-500 text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  Expense
                </button>
                <button
                  onClick={() => setFormType("income")}
                  className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${
                    formType === "income"
                      ? "bg-green-500 text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  Income
                </button>
              </div>
            </div>
            {/* Embedded Form */}
            <TransactionForm type={formType} isDashboard={true} />
          </div>
        </div>
      </div>

      {/* Recent History */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          Recent Transactions
        </h3>
        <div className="space-y-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          {transactionHistory()
            .slice(0, 5)
            .map((item) => (
              <TransactionItem key={item._id} item={item} />
            ))}
          {transactionHistory().length === 0 && (
            <p className="text-gray-400 text-center py-4">
              No recent transactions
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. INCOME VIEW COMPONENT
// ==========================================
const IncomeView = () => {
  const { incomes, totalIncome } = useGlobalContext();
  const sortedIncomes = [...incomes].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-gray-800">Incomes</h2>
      <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500 w-full mb-4">
        <h3 className="text-gray-500 flex items-center gap-2">
          <TrendingUp size={18} /> Total Income
        </h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          ₹{totalIncome()}
        </p>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2">
          <TransactionForm type="income" />
        </div>
        <div className="col-span-3 space-y-3">
          <h3 className="font-bold text-gray-600">Income History</h3>
          {sortedIncomes.map((item) => (
            <TransactionItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. EXPENSE VIEW COMPONENT
// ==========================================
const ExpenseView = () => {
  const { expenses, totalExpenses } = useGlobalContext();
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-gray-800">Expenses</h2>
      <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-red-500 w-full mb-4">
        <h3 className="text-gray-500 flex items-center gap-2">
          <TrendingDown size={18} /> Total Expenses
        </h3>
        <p className="text-3xl font-bold text-red-600 mt-2">
          ₹{totalExpenses()}
        </p>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2">
          <TransactionForm type="expense" />
        </div>
        <div className="col-span-3 space-y-3">
          <h3 className="font-bold text-gray-600">Expense History</h3>
          {sortedExpenses.map((item) => (
            <TransactionItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. INVESTMENT VIEW
// ==========================================
const InvestmentView = () => {
  const { expenses } = useGlobalContext();
  const investments = expenses.filter(
    (item) => item.category === "investments"
  );
  const totalInvested = investments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-gray-800">
        Investments Portfolio
      </h2>
      <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-500 w-full mb-4">
        <h3 className="text-gray-500 flex items-center gap-2">
          <PieChart size={18} /> Total Invested
        </h3>
        <p className="text-3xl font-bold text-yellow-600 mt-2">
          ₹{totalInvested}
        </p>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-4 text-sm text-blue-700">
            Tip: To add an investment, add an <b>Expense</b> and select the{" "}
            <b>Investments</b> category.
          </div>
          <TransactionForm type="expense" defaultCategory="investments" />
        </div>
        <div className="col-span-3 space-y-3">
          <h3 className="font-bold text-gray-600">Investment History</h3>
          {investments.length > 0 ? (
            investments.map((item) => (
              <TransactionItem key={item._id} item={item} />
            ))
          ) : (
            <p className="text-gray-400 italic">No investments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SHARED: TRANSACTION FORM COMPONENT
// ==========================================
const TransactionForm = ({
  type,
  defaultCategory = "",
  isDashboard = false,
}) => {
  const { addIncome } = useGlobalContext();
  const today = moment().format("YYYY-MM-DD");

  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: today,
    category: defaultCategory,
    description: "",
    type: type,
  });

  // Sync state type if props change (for Dashboard toggle)
  useEffect(() => {
    setInputState((prev) => ({ ...prev, type: type }));
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(inputState);
    setInputState({
      title: "",
      amount: "",
      date: today,
      category: defaultCategory,
      description: "",
      type: type,
    });
  };

  return (
    // Only add background styling if NOT on dashboard (Dashboard handles its own container)
    <div
      className={isDashboard ? "" : "bg-white rounded-2xl shadow-lg p-6 h-full"}
    >
      {/* Hide title on Dashboard since we use the Quick Add header there */}
      {!isDashboard && (
        <h3 className="text-xl font-bold mb-4 text-violet-800">
          New {type === "income" ? "Income" : "Expense"}
        </h3>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500"
          value={inputState.title}
          onChange={(e) =>
            setInputState({ ...inputState, title: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500"
          value={inputState.amount}
          onChange={(e) =>
            setInputState({ ...inputState, amount: e.target.value })
          }
        />

        <select
          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500"
          value={inputState.category}
          onChange={(e) =>
            setInputState({ ...inputState, category: e.target.value })
          }
        >
          <option value="" disabled>
            Select Category
          </option>
          {type === "expense" ? (
            <>
              <option value="food">Food</option>
              <option value="bills">Bills</option>
              <option value="entertainment">Entertainment</option>
              <option value="clothing">Clothing</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="shopping">Shopping</option>
              <option value="fuel">Fuel</option>
              <option value="groceries">Groceries</option>
              <option value="investments">Investments</option>
              <option value="travel">Travel</option>
              <option value="other">Other</option>
            </>
          ) : (
            <>
              <option value="salary">Salary</option>
              <option value="freelancing">Freelancing</option>
              <option value="investments">Investments</option>
              <option value="stocks">Stocks</option>
              <option value="bitcoin">Bitcoin</option>
              <option value="bank">Bank Transfer</option>
              <option value="youtube">Youtube</option>
              <option value="other">Other</option>
            </>
          )}
        </select>

        <textarea
          placeholder="Add A Description"
          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 resize-none"
          rows="2"
          value={inputState.description}
          onChange={(e) =>
            setInputState({ ...inputState, description: e.target.value })
          }
        ></textarea>

        <input
          type="date"
          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500"
          value={inputState.date}
          onChange={(e) =>
            setInputState({ ...inputState, date: e.target.value })
          }
        />

        <button
          className={`w-full text-white p-3 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2 ${
            type === "income"
              ? "bg-green-600 hover:bg-green-700 shadow-green-200"
              : "bg-red-600 hover:bg-red-700 shadow-red-200"
          }`}
        >
          <Plus size={18} /> Add {type === "income" ? "Income" : "Expense"}
        </button>
      </form>
    </div>
  );
};

// ==========================================
// SHARED: TRANSACTION LIST ITEM
// ==========================================
const TransactionItem = ({ item }) => {
  const { deleteTransaction } = useGlobalContext();
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-full ${
            item.type === "income"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          <IndianRupee size={20} />
        </div>
        <div>
          <p className="font-bold text-gray-800">{item.title}</p>
          <div className="flex gap-4 text-xs text-gray-400">
            <span>{moment(item.date).format("DD MMM YYYY")}</span>
            <span>{item.description.substring(0, 20)}...</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p
          className={`font-bold ${
            item.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.type === "income" ? "+" : "-"}₹{item.amount}
        </p>
        <button
          onClick={() => deleteTransaction(item._id)}
          className="bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
