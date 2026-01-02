const cron = require("node-cron");
const TransactionSchema = require("../models/TransactionModel");

const startCronJob = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Running Recurring Transaction Check...");

    try {
      const today = new Date();
      const recurringTransactions = await TransactionSchema.find({
        isRecurring: true,
        recurringFrequency: "monthly",
      });

      for (const original of recurringTransactions) {
        const originalDate = new Date(original.date);
        if (today.getDate() === originalDate.getDate()) {
          const lastRun = original.lastProcessed
            ? new Date(original.lastProcessed)
            : null;

          const isAlreadyRunThisMonth =
            lastRun &&
            lastRun.getMonth() === today.getMonth() &&
            lastRun.getFullYear() === today.getFullYear();

          if (!isAlreadyRunThisMonth) {
            const newTransaction = new TransactionSchema({
              title: original.title,
              amount: original.amount,
              type: original.type,
              category: original.category,
              description: `Auto-generated monthly: ${original.description}`,
              date: today,
              userId: original.userId,
              isRecurring: false,
              recurringFrequency: "none",
            });

            await newTransaction.save();

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
