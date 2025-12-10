const TransactionSchema = require("../models/TransactionModel");

exports.addTransaction = async (req, res) => {
  const { title, amount, category, description, date, type } = req.body;

  try {
    // 1. Convert Amount to Number (Fixes the issue!)
    const amountNumber = Number(amount);

    // 2. Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if amount is valid number and positive
    if (isNaN(amountNumber) || amountNumber <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    // 3. Create Transaction
    const transaction = TransactionSchema({
      title,
      amount: amountNumber, // Save the converted number
      category,
      description,
      date,
      type,
      userId: req.user.id,
    });

    await transaction.save();
    res.status(200).json({ message: "Transaction Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    // 1. Get the logged-in user's ID
    const userId = req.user.id;

    // 2. Find transactions ONLY belonging to this user
    const transactions = await TransactionSchema.find({ userId }).sort({
      createdAt: -1,
    }); // Newest first

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params; // Transaction ID
  const userId = req.user.id; // User ID

  try {
    // Security Check: We use findOneAndDelete with BOTH the transaction ID and the User ID.
    // This ensures User A cannot delete User B's transaction even if they guess the ID.
    const transaction = await TransactionSchema.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found or unauthorized" });
    }

    res.status(200).json({ message: "Transaction Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
