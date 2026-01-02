import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null);

  const getConfig = () => {
    const token = sessionStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-transaction`, income, getConfig());
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const getIncomes = async () => {
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

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-transaction/${id}`, getConfig());
      getIncomes();
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
      getIncomes();
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

        addBudget,
        getBudgets,
        deleteBudget,
        budgets,

        getAIHelp,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
