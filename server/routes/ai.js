const router = require("express").Router();
const { getAIResponse } = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");
router.post("/ask", protect, getAIResponse);

module.exports = router;
