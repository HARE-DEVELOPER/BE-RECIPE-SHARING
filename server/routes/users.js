const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register user
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// Get user profile
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("recipes favorites");
  res.json(user);
});

module.exports = router;