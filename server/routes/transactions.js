// const router = require("express").Router();
// const {
//   addTransaction,
//   getTransactions,
//   deleteTransaction,
// } = require("../controllers/transaction");
// const { protect } = require("../middleware/authMiddleware"); // Import middleware
// const {
//   addIncome,
//   getIncomes,
//   deleteIncome,
//   updateTransaction,
// } = require("../controllers/transaction");
// // Apply 'protect' to these routes
// router.post("/add-transaction", protect, addTransaction);
// router.get("/get-transactions", protect, getTransactions);
// router.delete("/delete-transaction/:id", protect, deleteTransaction);

// router.put("/update-transaction/:id", updateTransaction);

// module.exports = router;

const router = require("express").Router();
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transaction");

// --- NEW: Import Budget Controller ---
const {
  addBudget,
  getBudgets,
  deleteBudget,
} = require("../controllers/budget");

// Import Middleware
const { protect } = require("../middleware/authMiddleware");

// --- Transaction Routes ---
router.post("/add-transaction", protect, addTransaction);
router.get("/get-transactions", protect, getTransactions);
router.delete("/delete-transaction/:id", protect, deleteTransaction);
router.put("/update-transaction/:id", protect, updateTransaction); // IMPORTANT: Added 'protect' here

// --- NEW: Budget Routes ---
router.post("/add-budget", protect, addBudget);
router.get("/get-budgets", protect, getBudgets);
router.delete("/delete-budget/:id", protect, deleteBudget);

module.exports = router;
