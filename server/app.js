// const express = require("express");
// const cors = require("cors");
// const { db } = require("./db/db");
// const { readdirSync } = require("fs");
// const startCronJob = require("./cron/cron");
// const aiRoutes = require("./routes/ai");
// const app = express();
// require("dotenv").config();

// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // Routes
// readdirSync("./routes").map((route) => {
//   if (route !== "ai.js") app.use("/api/v1", require("./routes/" + route));
// });
// app.use("/api/v1/ai", aiRoutes);
// const server = () => {
//   db();
//   startCronJob();

//   app.listen(PORT, () => {
//     console.log("Listening to port:", PORT);
//   });
// };

// server();
const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const startCronJob = require("./cron/cron");
const aiRoutes = require("./routes/ai");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// =========================================
// 1. ROBUST SECURITY MIDDLEWARE (CORS)
// =========================================

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000", // Added this back (Standard React Port)
  "http://localhost:5173", // React Vite
  "http://localhost:5000", // Self-reference
  // Production URLs (Update these after deploying frontend)
  "https://planx-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// =========================================
// 2. HEALTH CHECK ROUTE
// =========================================
app.get("/", (req, res) => {
  res.send("API is running successfully. 🚀");
});

// =========================================
// 3. ROUTES
// =========================================
readdirSync("./routes").map((route) => {
  if (route.endsWith(".js") && route !== "ai.js") {
    app.use("/api/v1", require("./routes/" + route));
  }
});

app.use("/api/v1/ai", aiRoutes);

// =========================================
// 4. SERVER START
// =========================================
const server = () => {
  db();
  startCronJob();

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

server();
