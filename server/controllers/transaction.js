// const TransactionSchema = require("../models/TransactionModel");

// exports.addTransaction = async (req, res) => {
//   const { title, amount, category, description, date, type } = req.body;

//   try {
//     // 1. Convert Amount to Number (Fixes the issue!)
//     const amountNumber = Number(amount);

//     // 2. Validations
//     if (!title || !category || !description || !date) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

//     // Check if amount is valid number and positive
//     if (isNaN(amountNumber) || amountNumber <= 0) {
//       return res
//         .status(400)
//         .json({ message: "Amount must be a positive number" });
//     }

//     // 3. Create Transaction
//     const transaction = TransactionSchema({
//       title,
//       amount: amountNumber, // Save the converted number
//       category,
//       description,
//       date,
//       type,
//       userId: req.user.id,
//     });

//     await transaction.save();
//     res.status(200).json({ message: "Transaction Added" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.getTransactions = async (req, res) => {
//   try {
//     // 1. Get the logged-in user's ID
//     const userId = req.user.id;

//     // 2. Find transactions ONLY belonging to this user
//     const transactions = await TransactionSchema.find({ userId }).sort({
//       createdAt: -1,
//     }); // Newest first

//     res.status(200).json(transactions);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.deleteTransaction = async (req, res) => {
//   const { id } = req.params; // Transaction ID
//   const userId = req.user.id; // User ID

//   try {
//     // Security Check: We use findOneAndDelete with BOTH the transaction ID and the User ID.
//     // This ensures User A cannot delete User B's transaction even if they guess the ID.
//     const transaction = await TransactionSchema.findOneAndDelete({
//       _id: id,
//       userId: userId,
//     });

//     if (!transaction) {
//       return res
//         .status(404)
//         .json({ message: "Transaction not found or unauthorized" });
//     }

//     res.status(200).json({ message: "Transaction Deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

const TransactionSchema = require("../models/TransactionModel");

exports.addTransaction = async (req, res) => {
  const { title, amount, category, description, date, type } = req.body;

  try {
    // 1. Convert Amount to Number
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
    // Security Check: Ensure user deletes only their own data
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

// =========================================
// NEW: UPDATE TRANSACTION
// =========================================
exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, description, date, type } = req.body;
  const userId = req.user.id;

  try {
    // 1. Find the transaction belonging to this user
    const transaction = await TransactionSchema.findOne({ _id: id, userId });

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found or unauthorized" });
    }

    // 2. Update fields if provided
    if (title) transaction.title = title;
    if (category) transaction.category = category;
    if (description) transaction.description = description;
    if (date) transaction.date = date;
    if (type) transaction.type = type;

    // Special check for amount
    if (amount) {
      const amountNumber = Number(amount);
      if (isNaN(amountNumber) || amountNumber <= 0) {
        return res
          .status(400)
          .json({ message: "Amount must be a positive number" });
      }
      transaction.amount = amountNumber;
    }

    await transaction.save();
    res.status(200).json({ message: "Transaction Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
