const router = require("express").Router();
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transaction");

const {
  addBudget,
  getBudgets,
  deleteBudget,
} = require("../controllers/budget");

// Import Middleware
const { protect } = require("../middleware/authMiddleware");

// Transaction Routes
router.post("/add-transaction", protect, addTransaction);
router.get("/get-transactions", protect, getTransactions);
router.delete("/delete-transaction/:id", protect, deleteTransaction);
router.put("/update-transaction/:id", protect, updateTransaction);

router.post("/add-budget", protect, addBudget);
router.get("/get-budgets", protect, getBudgets);
router.delete("/delete-budget/:id", protect, deleteBudget);

module.exports = router;
