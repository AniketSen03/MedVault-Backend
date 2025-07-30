
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/model.signup"); 

router.get("/api/signup", (req, res) => {
  res.send("Singup endpoint is ready to receive POST requests.");
});

// Signup Route
router.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: newUser });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
