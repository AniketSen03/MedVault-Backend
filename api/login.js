const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/model.signup"); // adjust if needed

router.get("/api/login", (req, res) => {
  res.send("Login endpoint is ready to receive POST requests.");
});

// Login Route
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Optionally add JWT here for token-based auth

    res.status(200).json({ message: "Login successful", user: { name: existingUser.name, email: existingUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
