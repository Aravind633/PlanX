const router = require("express").Router();
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transaction");
const { protect } = require("../middleware/authMiddleware"); // Import middleware
const {
  addIncome,
  getIncomes,
  deleteIncome,
  updateTransaction,
} = require("../controllers/transaction");
// Apply 'protect' to these routes
router.post("/add-transaction", protect, addTransaction);
router.get("/get-transactions", protect, getTransactions);
router.delete("/delete-transaction/:id", protect, deleteTransaction);

router.put("/update-transaction/:id", updateTransaction);

module.exports = router;
