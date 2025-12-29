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
  Utensils,
  Home,
  Film,
  ShoppingBag,
  BookOpen,
  HeartPulse,
  Car,
  Zap,
  CircleDollarSign,
  Pencil,
  Trash,
  X,
} from "lucide-react";
import moment from "moment";

function Dashboard() {
  const [active, setActive] = useState(1);
  const [editItem, setEditItem] = useState(null);
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
        return (
          <DashboardOverview editItem={editItem} setEditItem={setEditItem} />
        );
      case 2:
        return <IncomeView editItem={editItem} setEditItem={setEditItem} />;
      case 3:
        return <ExpenseView editItem={editItem} setEditItem={setEditItem} />;
      case 4:
        return <InvestmentView editItem={editItem} setEditItem={setEditItem} />;
      default:
        return (
          <DashboardOverview editItem={editItem} setEditItem={setEditItem} />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-xl z-10 justify-between">
        <div>
          <div className="mb-10">
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
                  setEditItem(null);
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

      {/* MAIN CONTENT */}
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
// 1. DASHBOARD OVERVIEW COMPONENT (WITH ADVANCED FILTERS)
// ==========================================
const DashboardOverview = ({ editItem, setEditItem }) => {
  const { totalIncome, totalExpenses, totalBalance, incomes, expenses } =
    useGlobalContext();
  const [formType, setFormType] = useState("expense");

  // --- FILTER STATES ---
  const [filterType, setFilterType] = useState("all"); // all, income, expense
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, highest, lowest
  const [dateRange, setDateRange] = useState("30"); // 7, 30, 365, all

  // --- FILTERING LOGIC ---
  const getFilteredTransactions = () => {
    // 1. Combine all transactions
    let allTransactions = [...incomes, ...expenses];

    // 2. Filter by Type
    if (filterType !== "all") {
      allTransactions = allTransactions.filter(
        (item) => item.type === filterType
      );
    }

    // 3. Filter by Date
    if (dateRange !== "all") {
      const cutoffDate = moment().subtract(parseInt(dateRange), "days");
      allTransactions = allTransactions.filter((item) =>
        moment(item.date).isAfter(cutoffDate)
      );
    }

    // 4. Sort
    allTransactions.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "highest") return b.amount - a.amount;
      if (sortBy === "lowest") return a.amount - b.amount;
      return 0;
    });

    // Return top 6 results after filtering
    return allTransactions.slice(0, 6);
  };

  const filteredHistory = getFilteredTransactions();

  return (
    <div className="flex flex-col gap-8 pb-10">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

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

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3 h-auto">
          <Chart />
        </div>

        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-violet-800">Quick Add</h3>

              <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setFormType("expense")}
                  disabled={editItem !== null}
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
                  disabled={editItem !== null}
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

            <TransactionForm
              type={formType}
              isDashboard={true}
              editItem={editItem}
              setEditItem={setEditItem}
            />
          </div>

          <FinancialWisdomSlider />
        </div>
      </div>

      {/* --- RECENT HISTORY WITH FILTERS --- */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-700">Recent History</h3>

          {/* FILTER BAR UI */}
          <div className="flex gap-2">
            {/* 1. Date Filter */}
            <select
              className="bg-white border border-gray-200 text-gray-600 text-sm rounded-lg p-2 focus:outline-none focus:border-violet-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="365">Last Year</option>
              <option value="all">All Time</option>
            </select>

            {/* 2. Type Filter */}
            <select
              className="bg-white border border-gray-200 text-gray-600 text-sm rounded-lg p-2 focus:outline-none focus:border-violet-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* 3. Sort Filter */}
            <select
              className="bg-white border border-gray-200 text-gray-600 text-sm rounded-lg p-2 focus:outline-none focus:border-violet-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* LIST RENDERING */}
        <div className="space-y-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <TransactionItem
                key={item._id}
                item={item}
                setEditItem={setEditItem}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 font-medium">
                No transactions match your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. INCOME VIEW COMPONENT

const IncomeView = ({ editItem, setEditItem }) => {
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
          <TransactionForm
            type="income"
            editItem={editItem}
            setEditItem={setEditItem}
          />
        </div>
        <div className="col-span-3 space-y-3">
          <h3 className="font-bold text-gray-600">Income History</h3>
          {sortedIncomes.map((item) => (
            <TransactionItem
              key={item._id}
              item={item}
              setEditItem={setEditItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. EXPENSE VIEW COMPONENT

const ExpenseView = ({ editItem, setEditItem }) => {
  const { expenses, totalExpenses, totalIncome, totalBalance } =
    useGlobalContext();
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "food":
        return <Utensils size={18} />;
      case "groceries":
        return <Utensils size={18} />;
      case "rent":
        return <Home size={18} />;
      case "entertainment":
        return <Film size={18} />;
      case "shopping":
        return <ShoppingBag size={18} />;
      case "clothing":
        return <ShoppingBag size={18} />;
      case "education":
        return <BookOpen size={18} />;
      case "health":
        return <HeartPulse size={18} />;
      case "travel":
        return <Car size={18} />;
      case "fuel":
        return <Car size={18} />;
      case "bills":
        return <Zap size={18} />;
      case "investments":
        return <TrendingUp size={18} />;
      default:
        return <CircleDollarSign size={18} />;
    }
  };

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryTotals)
    .sort(([, amountA], [, amountB]) => amountB - amountA)
    .slice(0, 4);

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
        <div className="col-span-2 flex flex-col gap-6">
          <TransactionForm
            type="expense"
            editItem={editItem}
            setEditItem={setEditItem}
          />

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-700">
                  Savings Target
                </h3>
                <p className="text-xs text-gray-400">Target: 20% of Income</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg text-green-600">
                <TrendingUp size={24} />
              </div>
            </div>
            {(() => {
              const savingsPercentage =
                totalIncome() > 0
                  ? ((totalBalance() / totalIncome()) * 100).toFixed(0)
                  : 0;
              let colorClass = "bg-green-500";
              let message = "Great job!";
              if (savingsPercentage < 10) {
                colorClass = "bg-red-500";
                message = "Critical Low";
              } else if (savingsPercentage < 20) {
                colorClass = "bg-yellow-500";
                message = "Needs Improvement";
              }

              return (
                <>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-800">
                      {savingsPercentage}%
                    </span>
                    <span className="text-sm text-gray-500 mb-1">Saved</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${colorClass}`}
                      style={{ width: `${Math.max(savingsPercentage, 0)}%` }}
                    ></div>
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      savingsPercentage < 20 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {message}
                  </p>
                </>
              );
            })()}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-700 mb-5">
              Where your money went
            </h3>
            <div className="space-y-5">
              {topCategories.length > 0 ? (
                topCategories.map(([cat, amount], index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-violet-50 text-violet-600 p-3 rounded-full shadow-sm">
                      {getCategoryIcon(cat)}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize text-gray-700 font-bold">
                          {cat}
                        </span>
                        <span className="font-bold text-gray-800">
                          ₹{amount}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-violet-500 h-2 rounded-full opacity-80"
                          style={{
                            width: `${(amount / totalExpenses()) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">
                  Add expenses to see breakdown
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-3">
          <h3 className="font-bold text-gray-600">Expense History</h3>
          {sortedExpenses.map((item) => (
            <TransactionItem
              key={item._id}
              item={item}
              setEditItem={setEditItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. INVESTMENT VIEW

const InvestmentView = ({ editItem, setEditItem }) => {
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
          <TransactionForm
            type="expense"
            defaultCategory="investments"
            editItem={editItem}
            setEditItem={setEditItem}
          />
        </div>
        <div className="col-span-3 space-y-3">
          <h3 className="font-bold text-gray-600">Investment History</h3>
          {investments.length > 0 ? (
            investments.map((item) => (
              <TransactionItem
                key={item._id}
                item={item}
                setEditItem={setEditItem}
              />
            ))
          ) : (
            <p className="text-gray-400 italic">No investments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// FINANCIAL WISDOM SLIDER COMPONENT

const FinancialWisdomSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/slider/img1.png",
    },
    {
      id: 2,
      image: "/slider/img2.png",
    },
    {
      id: 3,
      image: "/slider/img3.jpeg",
    },
    {
      id: 4,
      image: "/slider/img4.jpeg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-lg group bg-white border border-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform group-hover:scale-105"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      ></div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
              idx === currentIndex ? "w-6 bg-violet-600" : "w-2 bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// UPDATED: TRANSACTION FORM COMPONENT (SMART EDIT)
// ==========================================
const TransactionForm = ({
  type,
  defaultCategory = "",
  isDashboard = false,
  editItem, // NEW
  setEditItem, // NEW
}) => {
  const { addIncome, updateTransaction } = useGlobalContext();
  const today = moment().format("YYYY-MM-DD");

  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: today,
    category: defaultCategory,
    description: "",
    type: type,
  });

  // 1. LISTEN FOR EDIT CLICKS
  useEffect(() => {
    if (editItem) {
      setInputState({
        title: editItem.title,
        amount: editItem.amount,
        date: moment(editItem.date).format("YYYY-MM-DD"),
        category: editItem.category,
        description: editItem.description,
        type: editItem.type,
      });
    } else {
      // Reset if editItem is null, but keep the current view's type
      setInputState((prev) => ({ ...prev, type: type }));
    }
  }, [editItem, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      updateTransaction(editItem._id, inputState);
      setEditItem(null);
    } else {
      addIncome(inputState);
    }

    // Reset Form
    setInputState({
      title: "",
      amount: "",
      date: today,
      category: defaultCategory,
      description: "",
      type: type,
    });
  };

  const cancelEdit = () => {
    setEditItem(null);
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
    <div
      className={isDashboard ? "" : "bg-white rounded-2xl shadow-lg p-6 h-fit"}
    >
      {!isDashboard && (
        <h3 className="text-xl font-bold mb-4 text-violet-800">
          {editItem
            ? "Edit Transaction"
            : `New ${type === "income" ? "Income" : "Expense"}`}
        </h3>
      )}

      {/* Cancel Edit Banner */}
      {editItem && (
        <div className="mb-3 flex justify-between items-center bg-yellow-50 p-2 rounded-lg border border-yellow-200">
          <span className="text-xs text-yellow-700 font-bold">
            Editing: {editItem.title}
          </span>
          <button
            onClick={cancelEdit}
            className="text-yellow-700 hover:text-red-500"
          >
            <X size={16} />
          </button>
        </div>
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
          {/* Show categories based on the CURRENT INPUT TYPE, not the prop type */}
          {inputState.type === "expense" ? (
            <>
              <option value="rent">Rent</option>
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
            editItem
              ? "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-200"
              : inputState.type === "income"
              ? "bg-green-600 hover:bg-green-700 shadow-green-200"
              : "bg-red-600 hover:bg-red-700 shadow-red-200"
          }`}
        >
          {editItem ? <Pencil size={18} /> : <Plus size={18} />}
          {editItem
            ? "Update Transaction"
            : `Add ${inputState.type === "income" ? "Income" : "Expense"}`}
        </button>
      </form>
    </div>
  );
};

// ==========================================
// UPDATED: TRANSACTION LIST ITEM (ALWAYS VISIBLE BUTTONS)
// ==========================================
const TransactionItem = ({ item, setEditItem }) => {
  const { deleteTransaction } = useGlobalContext();
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* LEFT SIDE: Icon + Title + Date */}
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

      {/* RIGHT SIDE: Amount + Buttons */}
      <div className="flex items-center gap-3">
        <p
          className={`font-bold mr-2 ${
            item.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.type === "income" ? "+" : "-"}₹{item.amount}
        </p>

        {/* EDIT BUTTON - Always Visible */}
        <button
          onClick={() => {
            // Scroll to top so user sees the form
            window.scrollTo({ top: 0, behavior: "smooth" });
            setEditItem(item);
          }}
          className="bg-yellow-100 text-yellow-600 p-2 rounded-full hover:bg-yellow-200 transition-colors shadow-sm"
          title="Edit Transaction"
        >
          <Pencil size={16} />
        </button>

        {/* DELETE BUTTON - Always Visible */}
        <button
          onClick={() => deleteTransaction(item._id)}
          className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors shadow-sm"
          title="Delete Transaction"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
