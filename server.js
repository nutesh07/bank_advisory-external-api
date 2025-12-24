// const express = require("express");
// const cors = require("cors");
// const bankRoutes = require("./routes/bankRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/banks", bankRoutes);

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log("External API running on port " + PORT);
// });

const express = require("express");
const cors = require("cors");
const bankRoutes = require("./routes/bankRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (ADD THIS)
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Bank Advisory External API is running",
    endpoints: {
      allBanks: "/api/banks",
      eligibleBanks: "/api/banks/eligible?salary=30000&type=salary"
    }
  });
});

app.use("/api/banks", bankRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("External API running");
});
