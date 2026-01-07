const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.getAIResponse = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const finalPrompt = `You are a helpful financial assistant for the PlanX app. Keep answers concise, friendly, and practical. User Question: ${prompt}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: finalPrompt,
    });

    res.status(200).json({ response: response.text });
  } catch (error) {
    console.error("----------- GEMINI API ERROR -----------");
    console.error("Error Message:", error.message);
    console.error("----------------------------------------");

    res.status(500).json({
      message: "AI Service Error",
      details: error.message,
    });
  }
};
