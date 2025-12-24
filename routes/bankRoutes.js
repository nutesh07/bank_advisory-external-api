const express = require("express");
const router = express.Router();
const banks = require("../data/banks.json");

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "External Bank Advisory API is working" });
});

// Get all banks OR filter by account type
router.get("/", (req, res) => {
  const { accountType } = req.query;

  if (accountType) {
    return res.json(
      banks.filter(bank => bank.accountType === accountType)
    );
  }

  res.json(banks);
});

// Eligible banks (basic logic)
router.get("/eligible", (req, res) => {
  const salary = Number(req.query.salary);
  const type = req.query.type;

  if (!salary || !type) {
    return res.status(400).json({
      message: "salary and type are required"
    });
  }

  let result = banks.filter(bank => bank.accountType === type);

  if (type === "savings") {
    result = result.filter(() => salary >= 10000);
  }

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
