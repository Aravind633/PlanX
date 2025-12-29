const cron = require("node-cron");
const TransactionSchema = require("../models/TransactionModel");

const startCronJob = () => {
  // Schedule task to run every day at midnight (00:00)
  cron.schedule("0 0 * * *", async () => {
    console.log("Running Recurring Transaction Check...");

    try {
      const today = new Date();

      // 1. Find all "Recurring" transactions
      const recurringTransactions = await TransactionSchema.find({
        isRecurring: true,
        recurringFrequency: "monthly",
      });

      for (const original of recurringTransactions) {
        // Logic: If the original date was the 15th, we check if today is the 15th
        const originalDate = new Date(original.date);

        // Check if today matches the day of the month (e.g., both are the 5th)
        if (today.getDate() === originalDate.getDate()) {
          // Check if we already processed it this month (avoid duplicates)
          const lastRun = original.lastProcessed
            ? new Date(original.lastProcessed)
            : null;

          const isAlreadyRunThisMonth =
            lastRun &&
            lastRun.getMonth() === today.getMonth() &&
            lastRun.getFullYear() === today.getFullYear();

          if (!isAlreadyRunThisMonth) {
            // CREATE NEW TRANSACTION
            const newTransaction = new TransactionSchema({
              title: original.title,
              amount: original.amount,
              type: original.type,
              category: original.category,
              description: `Auto-generated monthly: ${original.description}`,
              date: today, // Set date to TODAY
              userId: original.userId,
              isRecurring: false, // The copy shouldn't trigger another copy!
              recurringFrequency: "none",
            });

            await newTransaction.save();

            // UPDATE ORIGINAL (Mark as processed for this month)
            original.lastProcessed = today;
            await original.save();

            console.log(`Generated recurring item: ${original.title}`);
          }
        }
      }
    } catch (error) {
      console.error(" Cron Job Error:", error);
    }
  });
};

module.exports = startCronJob;
