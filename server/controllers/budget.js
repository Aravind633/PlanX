const BudgetSchema = require("../models/BudgetModel");

exports.addBudget = async (req, res) => {
  const { category, limit } = req.body;
  const userId = req.user.id;

  try {
    // 1. Validation
    if (!category || !limit) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (limit <= 0) {
      return res
        .status(400)
        .json({ message: "Limit must be a positive number" });
    }

    const existingBudget = await BudgetSchema.findOne({ userId, category });

    if (existingBudget) {
      existingBudget.limit = limit;
      await existingBudget.save();
      return res
        .status(200)
        .json({ message: "Budget Updated", budget: existingBudget });
    }

    const budget = new BudgetSchema({
      userId,
      category,
      limit,
    });

    await budget.save();
    res.status(200).json({ message: "Budget Set Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const userId = req.user.id;
    const budgets = await BudgetSchema.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteBudget = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await BudgetSchema.findOneAndDelete({ _id: id, userId });
    res.status(200).json({ message: "Budget Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
