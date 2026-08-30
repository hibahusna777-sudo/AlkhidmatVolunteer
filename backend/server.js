require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ============================================
// HOME / HEALTH CHECK
// ============================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Alkhidmat Volunteer API is running",
  });
});

// ============================================
// AI ASSISTANT
// ============================================
app.post("/api/assistant", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid message.",
      });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Anthropic API key is not configured.",
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system:
          "You are a helpful assistant for the Alkhidmat Foundation volunteer app. " +
          "Answer questions about joining events, volunteering opportunities, " +
          "events, attendance, and volunteer certificates. " +
          "Keep answers short, friendly, and clear. " +
          "If you do not know something specific about Alkhidmat programs, " +
          "say so honestly and suggest contacting the Alkhidmat support team.",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error:", data);

      return res.status(response.status).json({
        success: false,
        message: "AI service returned an error.",
      });
    }

    const reply = data?.content?.[0]?.text;

    if (!reply) {
      return res.status(500).json({
        success: false,
        message: "No response received from AI.",
      });
    }

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("AI Assistant error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to connect to AI service.",
    });
  }
});

// ============================================
// START SERVER
// ============================================
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
}

startServer();