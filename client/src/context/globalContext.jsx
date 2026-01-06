import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null);

  // Helper for Authorization Headers
  const getConfig = () => {
    const token = sessionStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}get-transactions`,
        getConfig()
      );

      const incomeList = response.data.filter((t) => t.type === "income");
      const expenseList = response.data.filter((t) => t.type === "expense");

      setIncomes(incomeList);
      setExpenses(expenseList);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-transaction`, income, getConfig());
      fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}add-transaction`, expense, getConfig());
      fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const getIncomes = () => fetchTransactions();
  const getExpenses = () => fetchTransactions();

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-transaction/${id}`, getConfig());
      fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const updateTransaction = async (id, transaction) => {
    try {
      await axios.put(
        `${BASE_URL}update-transaction/${id}`,
        transaction,
        getConfig()
      );
      fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const addBudget = async (budget) => {
    try {
      await axios.post(`${BASE_URL}add-budget`, budget, getConfig());
      getBudgets();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const getBudgets = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-budgets`, getConfig());
      setBudgets(response.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const deleteBudget = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-budget/${id}`, getConfig());
      getBudgets();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  // =========================================
  // AI ASSISTANT
  // =========================================
  const getAIHelp = async (prompt) => {
    try {
      const response = await axios.post(
        `${BASE_URL}ai/ask`,
        { prompt },
        getConfig()
      );
      return response.data.response;
    } catch (err) {
      setError(err.response?.data?.message || "AI Server Error");
      return "Sorry, I couldn't connect to the AI at the moment.";
    }
  };

  // =========================================
  // CALCULATIONS
  // =========================================
  const totalIncome = () => {
    return incomes.reduce((acc, curr) => acc + curr.amount, 0);
  };

  const totalExpenses = () => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        // Transaction Actions
        addIncome,
        addExpense,
        getIncomes,
        getExpenses,
        deleteTransaction,
        updateTransaction,

        // Data
        incomes,
        expenses,

        // Calculations
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,

        // Budgets
        addBudget,
        getBudgets,
        deleteBudget,
        budgets,

        // AI & Utils
        getAIHelp,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
