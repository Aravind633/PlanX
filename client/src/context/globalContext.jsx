import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // ---------------------------------------------------
  // 1. Authentication Helper
  // ---------------------------------------------------
  // This retrieves the token from LocalStorage to send to the backend
  const getConfig = () => {
    const token = sessionStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // ---------------------------------------------------
  // 2. API Calls
  // ---------------------------------------------------

  // Add Transaction (Income or Expense)
  const addIncome = async (income) => {
    try {
      // Pass 'getConfig()' as the 3rd argument for security
      await axios.post(`${BASE_URL}add-transaction`, income, getConfig());
      getIncomes(); // Refresh the list immediately
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  // Get All Transactions
  const getIncomes = async () => {
    try {
      // Pass 'getConfig()' as the 2nd argument for security
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
      getIncomes(); // Refresh list after deleting
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  // ---------------------------------------------------
  // 3. Calculations
  // ---------------------------------------------------

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
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,
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
