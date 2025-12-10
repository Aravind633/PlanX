const router = require("express").Router();
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transaction");
const { protect } = require("../middleware/authMiddleware"); // Import middleware

// Apply 'protect' to these routes
router.post("/add-transaction", protect, addTransaction);
router.get("/get-transactions", protect, getTransactions);
router.delete("/delete-transaction/:id", protect, deleteTransaction);

module.exports = router;
