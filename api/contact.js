const express = require("express");
const router = express.Router();
const Contact = require("../models/models.contact");

router.get("/api/contact", (req, res) => {
  res.send("Contact endpoint is ready to receive POST requests.");
});

router.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully." });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
