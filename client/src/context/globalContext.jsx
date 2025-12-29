import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]); // <--- NEW: Budget State
  const [error, setError] = useState(null);

  // 1. Authentication Helper
  const getConfig = () => {
    const token = sessionStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // 2. API Calls (Transactions)

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-transaction`, income, getConfig());
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  // Get All Transactions
  const getIncomes = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}get-transactions`,
        getConfig()
      );

      // Separate data into Income and Expense arrays
      const incomeList = response.data.filter((t) => t.type === "income");
      const expenseList = response.data.filter((t) => t.type === "expense");

      setIncomes(incomeList);
      setExpenses(expenseList);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  // Delete Transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-transaction/${id}`, getConfig());
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  // Update Transaction
  const updateTransaction = async (id, transaction) => {
    try {
      await axios.put(
        `${BASE_URL}update-transaction/${id}`,
        transaction,
        getConfig()
      );
      getIncomes(); // Refresh the list to show changes immediately
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  // =================================
  // 3. NEW: BUDGET API CALLS
  // =================================
  const addBudget = async (budget) => {
    try {
      await axios.post(`${BASE_URL}add-budget`, budget, getConfig());
      getBudgets(); // Refresh list
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

  // 4. Calculations

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
        addIncome,
        getIncomes,
        incomes,
        expenses,
        deleteTransaction,
        updateTransaction,
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        // --- NEW EXPORTS ---
        addBudget,
        getBudgets,
        deleteBudget,
        budgets,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
