// import React, { useContext, useState } from "react";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/v1/";
// const GlobalContext = React.createContext();

// export const GlobalProvider = ({ children }) => {
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);

//   // 1. Authentication Helper

//   const getConfig = () => {
//     const token = sessionStorage.getItem("token");
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   // 2. API Calls

//   const addIncome = async (income) => {
//     try {
//       await axios.post(`${BASE_URL}add-transaction`, income, getConfig());
//       getIncomes();
//     } catch (err) {
//       setError(err.response?.data?.message);
//     }
//   };

//   // Get All Transactions
//   const getIncomes = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}get-transactions`,
//         getConfig()
//       );

//       // Separate data into Income and Expense arrays
//       const incomeList = response.data.filter((t) => t.type === "income");
//       const expenseList = response.data.filter((t) => t.type === "expense");

//       setIncomes(incomeList);
//       setExpenses(expenseList);
//     } catch (err) {
//       setError(err.response?.data?.message);
//     }
//   };

//   // Delete Transaction
//   const deleteTransaction = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}delete-transaction/${id}`, getConfig());
//       getIncomes();
//     } catch (err) {
//       setError(err.response?.data?.message);
//     }
//   };

//   // 3. Calculations

//   const totalIncome = () => {
//     return incomes.reduce((acc, curr) => acc + curr.amount, 0);
//   };

//   const totalExpenses = () => {
//     return expenses.reduce((acc, curr) => acc + curr.amount, 0);
//   };

//   const totalBalance = () => {
//     return totalIncome() - totalExpenses();
//   };

//   const transactionHistory = () => {
//     const history = [...incomes, ...expenses];
//     history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     return history.slice(0, 3);
//   };

//   return (
//     <GlobalContext.Provider
//       value={{
//         addIncome,
//         getIncomes,
//         incomes,
//         expenses,
//         deleteTransaction,
//         totalIncome,
//         totalExpenses,
//         totalBalance,
//         transactionHistory,
//         error,
//         setError,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalContext = () => {
//   return useContext(GlobalContext);
// };

import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
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

  // 2. API Calls

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

  // --- NEW: Update Transaction ---
  const updateTransaction = async (id, transaction) => {
    try {
      // We must pass getConfig() here so the backend knows who is updating!
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

  // 3. Calculations

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
        updateTransaction, // <--- Added here
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
