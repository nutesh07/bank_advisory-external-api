const express = require("express");
const router = express.Router();
const banks = require("../data/banks.json");

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "External Bank Advisory API is working" });
});

// Get all banks
router.get("/", (req, res) => {
  res.json(banks);
});

// Get eligible banks
router.get("/eligible", (req, res) => {
  const salary = Number(req.query.salary);
  const type = req.query.type;

  const result = banks.filter(
    bank =>
      salary >= bank.minSalary &&
      bank.accountType === type
  );

  res.json(result);
});

// Get bank by ID
router.get("/:id", (req, res) => {
  const bank = banks.find(b => b.id == req.params.id);
  bank
    ? res.json(bank)
    : res.status(404).json({ message: "Bank not found" });
});

module.exports = router;
