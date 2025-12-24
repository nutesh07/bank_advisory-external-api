const express = require("express");
const cors = require("cors");
const bankRoutes = require("./routes/bankRoutes");

const app = express();

const API_KEY = "sk_bank_123456789";

app.use(cors());
app.use(express.json());

function apiKeyAuth(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or missing API key"
    });
  }
  next();
}

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Bank Advisory External API is running",
    auth: "API Key required in x-api-key header"
  });
});

app.use("/api/banks", apiKeyAuth, bankRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("External API running");
});
