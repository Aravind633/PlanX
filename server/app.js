const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const startCronJob = require("./cron/cron");
const aiRoutes = require("./routes/ai");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync("./routes").map((route) => {
  if (route !== "ai.js") app.use("/api/v1", require("./routes/" + route));
});
app.use("/api/v1/ai", aiRoutes);
const server = () => {
  db();
  startCronJob();

  app.listen(PORT, () => {
    console.log("Listening to port:", PORT);
  });
};

server();
