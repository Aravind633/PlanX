import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import Chart from "../components/Chart";
import AiAssistant from "../components/AiAssistant";
import PlanXImg from "../assets/planX-Logo.jpeg";
import {
  TrendingUp,
  TrendingDown,
  LogOut,
  LayoutDashboard,
  PieChart,
  Target,
  Menu,
  X,
  Plus,
  Pencil,
  Trash,
  Repeat,
  CircleDollarSign,
  Utensils,
  Home,
  Film,
  ShoppingBag,
  BookOpen,
  HeartPulse,
  Car,
  Zap,
} from "lucide-react";
import moment from "moment";

function Dashboard() {
  const [active, setActive] = useState(1);
  const [editItem, setEditItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { getIncomes, getExpenses, getBudgets, error, setError } =
    useGlobalContext();

  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    getIncomes();
    getExpenses();
    getBudgets();
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const menuItems = [
    { id: 1, title: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: 2, title: "Incomes", icon: <TrendingUp size={20} /> },
    { id: 3, title: "Expenses", icon: <TrendingDown size={20} /> },
    { id: 4, title: "Investments", icon: <PieChart size={20} /> },
    { id: 5, title: "Budgets", icon: <Target size={20} /> },
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
      case 5:
        return <BudgetView />;
      default:
        return (
          <DashboardOverview editItem={editItem} setEditItem={setEditItem} />
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative selection:bg-violet-500/30 font-sans text-gray-100">
      <div className="md:hidden fixed top-0 w-full z-40 p-4 flex justify-between items-center glass border-b-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-black p-[1px]">
            <img
              src={PlanXImg}
              alt="Logo"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          <span className="font-bold text-lg text-white tracking-wide">
            PlanX
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-300 hover:text-white"
        >
          <Menu size={28} />
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-72 p-4 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:inset-auto
      `}
      >
        <div className="h-full glass rounded-3xl flex flex-col justify-between p-6">
          <div>
            <div className="mb-10 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
                  <img
                    src={PlanXImg}
                    alt="PlanX Logo"
                    className="w-16 h-16 rounded-lg object-contain hidden md:block"
                  />
                  <span className="tracking-tight">
                    <span className="text-white">Plan</span>
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

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden text-gray-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`cursor-pointer font-medium p-3.5 rounded-2xl transition-all duration-300 flex items-center gap-4 group
                  ${
                    active === item.id
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40 translate-x-1"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span
                    className={`${
                      active === item.id
                        ? "text-white"
                        : "text-gray-500 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4 p-2 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-bold shadow-md">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-sm truncate text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm w-full px-2 font-medium"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-6 pt-20 md:pt-6 w-full custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-8 pb-24">
          {error && (
            <div className="glass border-l-4 border-red-500 p-4 rounded-xl flex justify-between items-center text-red-200 animate-pulse">
              <p>{error}</p>
              <button onClick={() => setError(null)}>
                <X size={16} />
              </button>
            </div>
          )}
          {displayData()}
        </div>
      </main>

      <AiAssistant />
    </div>
  );
}

const DashboardOverview = ({ editItem, setEditItem }) => {
  const { totalBalance, totalIncome, totalExpenses, incomes, expenses } =
    useGlobalContext();
  const [formType, setFormType] = useState("expense");

  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [dateRange, setDateRange] = useState("30");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getFilteredTransactions = () => {
    let allTransactions = [...incomes, ...expenses];
    if (filterType !== "all")
      allTransactions = allTransactions.filter(
        (item) => item.type === filterType
      );
    if (dateRange !== "all") {
      const cutoffDate = moment().subtract(parseInt(dateRange), "days");
      allTransactions = allTransactions.filter((item) =>
        moment(item.date).isAfter(cutoffDate)
      );
    }
    allTransactions.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "highest") return b.amount - a.amount;
      if (sortBy === "lowest") return a.amount - b.amount;
      return 0;
    });
    return allTransactions;
  };

  const filteredHistory = getFilteredTransactions();
  const currentItems = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Overview
          </h2>
          <p className="text-gray-400 text-sm mt-1">Financial snapshot</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[30px] bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-900 text-white shadow-2xl shadow-violet-900/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/20 transition-all"></div>
          <p className="text-violet-200 font-medium mb-1 flex items-center gap-2">
            <CircleDollarSign size={18} /> Total Balance
          </p>
          <p className="text-4xl font-bold tracking-tight">₹{totalBalance()}</p>
        </div>
        <div className="glass-card p-6 flex flex-col justify-center border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
              <TrendingUp size={20} />
            </div>
            <span className="text-gray-400">Income</span>
          </div>
          <p className="text-2xl font-bold text-green-400">+₹{totalIncome()}</p>
        </div>
        <div className="glass-card p-6 flex flex-col justify-center border-l-4 border-red-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
              <TrendingDown size={20} />
            </div>
            <span className="text-gray-400">Expenses</span>
          </div>
          <p className="text-2xl font-bold text-red-400">-₹{totalExpenses()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 h-auto">
          <Chart />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Quick Add</h3>
              <div className="flex bg-black/40 p-1 rounded-xl">
                <button
                  onClick={() => setFormType("expense")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    formType === "expense"
                      ? "bg-red-500/20 text-red-400 shadow-sm"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  Expense
                </button>
                <button
                  onClick={() => setFormType("income")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    formType === "income"
                      ? "bg-green-500/20 text-green-400 shadow-sm"
                      : "text-gray-500 hover:text-gray-300"
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

      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-xl font-bold text-white">Recent History</h3>
          <div className="flex flex-wrap gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white/5 border border-white/10 text-gray-300 text-xs rounded-lg p-2 focus:outline-none focus:border-violet-500"
            >
              <option value="7" className="bg-gray-900">
                Last 7 Days
              </option>
              <option value="30" className="bg-gray-900">
                Last 30 Days
              </option>
              <option value="365" className="bg-gray-900">
                Last Year
              </option>
              <option value="all" className="bg-gray-900">
                All Time
              </option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white/5 border border-white/10 text-gray-300 text-xs rounded-lg p-2 focus:outline-none focus:border-violet-500"
            >
              <option value="all" className="bg-gray-900">
                All Types
              </option>
              <option value="income" className="bg-gray-900">
                Income
              </option>
              <option value="expense" className="bg-gray-900">
                Expense
              </option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 text-gray-300 text-xs rounded-lg p-2 focus:outline-none focus:border-violet-500"
            >
              <option value="newest" className="bg-gray-900">
                Newest
              </option>
              <option value="oldest" className="bg-gray-900">
                Oldest
              </option>
              <option value="highest" className="bg-gray-900">
                Highest
              </option>
              <option value="lowest" className="bg-gray-900">
                Lowest
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-3 glass-card p-4 min-h-[400px]">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <TransactionItem
                key={item._id}
                item={item}
                setEditItem={setEditItem}
              />
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              No transactions found.
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredHistory.length}
            itemsPerPage={itemsPerPage}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

const IncomeView = ({ editItem, setEditItem }) => {
  const { incomes, totalIncome } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const sortedIncomes = [...incomes].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const currentItems = sortedIncomes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-white">Incomes</h2>
      <div className="glass-card p-6 border-l-4 border-green-500">
        <h3 className="text-gray-400 flex items-center gap-2">
          <TrendingUp size={18} /> Total Income
        </h3>
        <p className="text-3xl font-bold text-green-400 mt-2">
          ₹{totalIncome()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-violet-400">
              {editItem ? "Edit Income" : "Add Income"}
            </h3>
            <TransactionForm
              type="income"
              editItem={editItem}
              setEditItem={setEditItem}
            />
          </div>
        </div>
        <div className="lg:col-span-3 space-y-3">
          <h3 className="font-bold text-gray-400 mb-2">Income History</h3>
          {currentItems.map((item) => (
            <TransactionItem
              key={item._id}
              item={item}
              setEditItem={setEditItem}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalItems={sortedIncomes.length}
            itemsPerPage={itemsPerPage}
            paginate={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

const ExpenseView = ({ editItem, setEditItem }) => {
  const { expenses, totalExpenses, totalIncome, totalBalance } =
    useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const currentItems = sortedExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "food":
        return <Utensils size={16} />;
      case "rent":
        return <Home size={16} />;
      case "entertainment":
        return <Film size={16} />;
      case "shopping":
        return <ShoppingBag size={16} />;
      case "bills":
        return <Zap size={16} />;
      case "travel":
        return <Car size={16} />;
      case "health":
        return <HeartPulse size={16} />;
      case "education":
        return <BookOpen size={16} />;
      default:
        return <CircleDollarSign size={16} />;
    }
  };

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});
  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  const savingsPercentage =
    totalIncome() > 0 ? (totalBalance() / totalIncome()) * 100 : 0;
  const savingsColor =
    savingsPercentage < 10
      ? "bg-red-500"
      : savingsPercentage < 20
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-white">Expenses</h2>
      <div className="glass-card p-6 border-l-4 border-red-500">
        <h3 className="text-gray-400 flex items-center gap-2">
          <TrendingDown size={18} /> Total Expenses
        </h3>
        <p className="text-3xl font-bold text-red-400 mt-2">
          ₹{totalExpenses()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-violet-400">
              {editItem ? "Edit Expense" : "Add Expense"}
            </h3>
            <TransactionForm
              type="expense"
              editItem={editItem}
              setEditItem={setEditItem}
            />
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-gray-200 mb-1">
              Savings Target
            </h3>
            <p className="text-xs text-gray-500 mb-4">Goal: 20% of Income</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-white">
                {savingsPercentage.toFixed(0)}%
              </span>
              <span className="text-sm text-gray-400 mb-1">Saved</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${savingsColor}`}
                style={{
                  width: `${Math.max(0, Math.min(savingsPercentage, 100))}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-gray-200 mb-4">
              Top Spending
            </h3>
            <div className="space-y-4">
              {topCategories.map(([cat, amount], idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="bg-violet-500/20 text-violet-300 p-2 rounded-lg">
                    {getCategoryIcon(cat)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1 text-gray-300">
                      <span className="capitalize font-semibold">{cat}</span>
                      <span>₹{amount}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        className="bg-violet-500 h-1.5 rounded-full opacity-80"
                        style={{
                          width: `${(amount / totalExpenses()) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
              {topCategories.length === 0 && (
                <p className="text-gray-500 text-sm italic">No data yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <h3 className="font-bold text-gray-400 mb-2">Expense History</h3>
          {currentItems.map((item) => (
            <TransactionItem
              key={item._id}
              item={item}
              setEditItem={setEditItem}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalItems={sortedExpenses.length}
            itemsPerPage={itemsPerPage}
            paginate={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

const InvestmentView = ({ editItem, setEditItem }) => {
  const { expenses } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const investments = expenses.filter(
    (item) => item.category === "investments"
  );
  const totalInvested = investments.reduce((acc, curr) => acc + curr.amount, 0);

  const currentItems = investments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-white">Portfolio</h2>
      <div className="glass-card p-6 border-l-4 border-yellow-500">
        <h3 className="text-gray-400 flex items-center gap-2">
          <PieChart size={18} /> Total Invested
        </h3>
        <p className="text-3xl font-bold text-yellow-400 mt-2">
          ₹{totalInvested}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mb-6 text-sm text-blue-300">
              Tip: Add an Expense with category <b>"Investments"</b> to track it
              here.
            </div>
            <h3 className="text-xl font-bold mb-4 text-violet-400">
              Add Investment
            </h3>

            <TransactionForm
              type="expense"
              defaultCategory="investments"
              editItem={editItem}
              setEditItem={setEditItem}
            />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <h3 className="font-bold text-gray-400 mb-2">Investment History</h3>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <TransactionItem
                key={item._id}
                item={item}
                setEditItem={setEditItem}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              No investments recorded yet.
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalItems={investments.length}
            itemsPerPage={itemsPerPage}
            paginate={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

const BudgetView = () => {
  const { budgets, addBudget, deleteBudget, expenses } = useGlobalContext();
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!category || !limit) return;
    addBudget({ category, limit: parseFloat(limit) });
    setCategory("");
    setLimit("");
  };

  const getProgress = (cat, limit) => {
    const spent = expenses
      .filter((t) => t.category === cat)
      .reduce((acc, curr) => acc + curr.amount, 0);
    const percent = Math.min((spent / limit) * 100, 100);
    const color =
      percent > 100
        ? "bg-red-500"
        : percent > 80
        ? "bg-red-400"
        : percent > 50
        ? "bg-yellow-400"
        : "bg-green-400";
    return { spent, percent, color };
  };

  const totalLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => {
    return (
      acc +
      expenses
        .filter((t) => t.category === b.category)
        .reduce((sum, curr) => sum + curr.amount, 0)
    );
  }, 0);
  const totalRemaining = totalLimit - totalSpent;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-white">Smart Budgets</h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-violet-400">
              Set Monthly Limit
            </h3>
            <form onSubmit={handleAddBudget} className="space-y-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field appearance-none"
                required
              >
                <option value="" disabled className="bg-gray-900">
                  Select Category
                </option>
                <option value="food" className="bg-gray-900">
                  Food
                </option>
                <option value="rent" className="bg-gray-900">
                  Rent
                </option>
                <option value="bills" className="bg-gray-900">
                  Bills
                </option>
                <option value="entertainment" className="bg-gray-900">
                  Entertainment
                </option>
                <option value="shopping" className="bg-gray-900">
                  Shopping
                </option>
                <option value="fuel" className="bg-gray-900">
                  Fuel
                </option>
                <option value="travel" className="bg-gray-900">
                  Travel
                </option>
                <option value="health" className="bg-gray-900">
                  Health
                </option>
              </select>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="Limit Amount (₹)"
                className="input-field"
                required
              />
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Plus size={18} /> Set Budget
              </button>
            </form>
          </div>

          {budgets.length > 0 && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Target size={20} /> Status
                </h3>
              </div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-xs opacity-70">Total Budget</p>
                  <p className="text-2xl font-bold">₹{totalLimit}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-70">Spent</p>
                  <p className="text-xl font-bold text-red-200">
                    ₹{totalSpent}
                  </p>
                </div>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    totalSpent > totalLimit ? "bg-red-300" : "bg-green-300"
                  }`}
                  style={{
                    width: `${Math.min((totalSpent / totalLimit) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl flex justify-between items-center backdrop-blur-sm border border-white/10">
                <span className="text-sm font-medium">Remaining</span>
                <span
                  className={`text-lg font-bold ${
                    totalRemaining < 0 ? "text-red-200" : "text-green-200"
                  }`}
                >
                  {totalRemaining < 0 ? "-" : ""}₹{Math.abs(totalRemaining)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-3 space-y-4">
          {budgets.length > 0 ? (
            budgets.map((budget) => {
              const { spent, percent, color } = getProgress(
                budget.category,
                budget.limit
              );
              return (
                <div
                  key={budget._id}
                  className="glass-card p-5 flex flex-col gap-3 group hover:bg-white/5 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-lg text-sm font-bold capitalize">
                      {budget.category}
                    </span>
                    <button
                      onClick={() => deleteBudget(budget._id)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                        Spent / Limit
                      </p>
                      <p className="text-lg font-bold text-gray-200">
                        ₹{spent}{" "}
                        <span className="text-gray-500 text-sm">
                          / ₹{budget.limit}
                        </span>
                      </p>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        percent >= 100 ? "text-red-400" : "text-gray-300"
                      }`}
                    >
                      {percent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${color}`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  {percent >= 100 && (
                    <p className="text-xs text-red-400 font-bold flex items-center gap-1">
                      <TrendingDown size={12} /> Budget Exceeded!
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-gray-500">
              No budgets set.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FinancialWisdomSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { id: 1, image: "/slider/img1.png" },
    { id: 2, image: "/slider/img2.png" },
    { id: 3, image: "/slider/img3.jpeg" },
    { id: 4, image: "/slider/img4.jpeg" },
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % slides.length),
      4000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
      <div className="absolute inset-0 bg-gray-800"></div>
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform group-hover:scale-105"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
              idx === currentIndex ? "w-6 bg-violet-500" : "w-2 bg-white/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalItems, itemsPerPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
      >
        Previous
      </button>
      <span className="text-xs text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
      >
        Next
      </button>
    </div>
  );
};

const TransactionForm = ({
  type,
  defaultCategory = "",
  isDashboard = false,
  editItem,
  setEditItem,
}) => {
  const { addIncome, addExpense, updateTransaction } = useGlobalContext();
  const today = moment().format("YYYY-MM-DD");

  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: today,
    category: defaultCategory,
    description: "",
    type: type,
    isRecurring: false,
  });

  useEffect(() => {
    if (editItem) {
      setInputState({
        title: editItem.title,
        amount: editItem.amount,
        date: moment(editItem.date).format("YYYY-MM-DD"),
        category: editItem.category,
        description: editItem.description,
        type: editItem.type,
        isRecurring: editItem.isRecurring || false,
      });
    } else {
      setInputState((prev) => ({
        ...prev,
        type,
        category: defaultCategory,
        isRecurring: false,
      }));
    }
  }, [editItem, type, defaultCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...inputState,
      recurringFrequency: inputState.isRecurring ? "monthly" : "none",
    };
    if (editItem) {
      updateTransaction(editItem._id, data);
      setEditItem(null);
    } else {
      type === "income" ? addIncome(data) : addExpense(data);
    }
    setInputState({
      title: "",
      amount: "",
      date: today,
      category: defaultCategory,
      description: "",
      type,
      isRecurring: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {editItem && (
        <div className="flex justify-between items-center bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/30">
          <span className="text-xs text-yellow-500 font-bold">
            Editing: {editItem.title}
          </span>
          <button
            type="button"
            onClick={() => setEditItem(null)}
            className="text-yellow-500 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}
      <input
        type="text"
        value={inputState.title}
        onChange={(e) =>
          setInputState({ ...inputState, title: e.target.value })
        }
        placeholder="Title"
        className="input-field"
        required
      />
      <div className="flex gap-3">
        <input
          type="number"
          value={inputState.amount}
          onChange={(e) =>
            setInputState({ ...inputState, amount: e.target.value })
          }
          placeholder="Amount"
          className="input-field"
          required
        />
        <input
          type="date"
          value={inputState.date}
          onChange={(e) =>
            setInputState({ ...inputState, date: e.target.value })
          }
          className="input-field"
          required
        />
      </div>
      <select
        value={inputState.category}
        onChange={(e) =>
          setInputState({ ...inputState, category: e.target.value })
        }
        className="input-field appearance-none"
        required
      >
        <option value="" disabled className="bg-gray-900">
          Select Category
        </option>
        {type === "expense" ? (
          <>
            <option value="rent" className="bg-gray-900">
              Rent
            </option>
            <option value="food" className="bg-gray-900">
              Food
            </option>
            <option value="bills" className="bg-gray-900">
              Bills
            </option>
            <option value="entertainment" className="bg-gray-900">
              Entertainment
            </option>
            <option value="clothing" className="bg-gray-900">
              Clothing
            </option>
            <option value="education" className="bg-gray-900">
              Education
            </option>
            <option value="health" className="bg-gray-900">
              Health
            </option>
            <option value="shopping" className="bg-gray-900">
              Shopping
            </option>
            <option value="fuel" className="bg-gray-900">
              Fuel
            </option>
            <option value="groceries" className="bg-gray-900">
              Groceries
            </option>
            <option value="investments" className="bg-gray-900">
              Investments
            </option>
            <option value="travel" className="bg-gray-900">
              Travel
            </option>
            <option value="other" className="bg-gray-900">
              Other
            </option>
          </>
        ) : (
          <>
            <option value="salary" className="bg-gray-900">
              Salary
            </option>
            <option value="freelancing" className="bg-gray-900">
              Freelancing
            </option>
            <option value="investments" className="bg-gray-900">
              Investments
            </option>
            <option value="stocks" className="bg-gray-900">
              Stocks
            </option>
            <option value="bitcoin" className="bg-gray-900">
              Bitcoin
            </option>
            <option value="bank" className="bg-gray-900">
              Bank Transfer
            </option>
            <option value="youtube" className="bg-gray-900">
              Youtube
            </option>
            <option value="other" className="bg-gray-900">
              Other
            </option>
          </>
        )}
      </select>
      <textarea
        value={inputState.description}
        onChange={(e) =>
          setInputState({ ...inputState, description: e.target.value })
        }
        placeholder="Description (Optional)"
        rows="2"
        className="input-field resize-none"
      ></textarea>

      <div className="flex items-center gap-2 pl-1">
        <input
          type="checkbox"
          id="recurring"
          checked={inputState.isRecurring}
          onChange={(e) =>
            setInputState({ ...inputState, isRecurring: e.target.checked })
          }
          className="accent-violet-600 w-4 h-4 cursor-pointer"
        />
        <label
          htmlFor="recurring"
          className="text-sm text-gray-400 cursor-pointer select-none"
        >
          Recurring Monthly
        </label>
      </div>

      <button
        className={`w-full py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
          editItem
            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
            : "btn-primary"
        }`}
      >
        {editItem ? <Pencil size={18} /> : <Plus size={18} />}
        {editItem
          ? "Update Transaction"
          : `Add ${type === "income" ? "Income" : "Expense"}`}
      </button>
    </form>
  );
};

const TransactionItem = ({ item, setEditItem }) => {
  const { deleteTransaction } = useGlobalContext();
  const Icon = item.type === "income" ? TrendingUp : TrendingDown;
  const color = item.type === "income" ? "text-green-400" : "text-red-400";
  const bgColor =
    item.type === "income"
      ? "bg-green-500/10 border-green-500/20"
      : "bg-red-500/10 border-red-500/20";

  return (
    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${bgColor} ${color}`}
        >
          <Icon size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-gray-200">{item.title}</h4>
            {item.isRecurring && (
              <span className="bg-violet-500/20 text-violet-300 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Repeat size={8} /> Monthly
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 flex gap-2 mt-0.5">
            <span>{moment(item.date).format("DD MMM YYYY")}</span>
            <span className="capitalize">• {item.category}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`font-bold text-lg ${color}`}>
          {item.type === "income" ? "+" : "-"}₹{item.amount}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setEditItem(item);
            }}
            className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-yellow-400"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => deleteTransaction(item._id)}
            className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-red-400"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
