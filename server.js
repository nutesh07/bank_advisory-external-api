const express = require("express");
const cors = require("cors");
const bankRoutes = require("./routes/bankRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/banks", bankRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("External API running on port " + PORT);
});
