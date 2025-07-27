const express = require("express");
const router = express.Router();
const Cart = require("../models/model.cart"); // make sure path is correct

router.get("/cart", (req, res) => {
  res.send("Cart endpoint is ready to receive POST requests.");
});

router.post("/cart", async (req, res) => {
  try {
    const { user, items } = req.body;

    if (!user) {
      return res.status(400).json({ error: "User is required" });
    }

    if (!items || items.length === 0) {
      // If cart is empty, delete the user's cart document
      await Cart.findOneAndDelete({ user });
      return res.status(200).json({ message: "Cart deleted since it's empty" });
    }

    // Otherwise, save/update the cart
    const updated = await Cart.findOneAndUpdate(
      { user },
      { items, date: new Date() },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Cart saved", cart: updated });
  } catch (err) {
    console.error("Cart Save Error:", err);
    res.status(500).json({ error: "Failed to save cart" });
  }
});

// Fetch latest cart for user
router.get("/cart/:userId", async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.params.userId }).sort({ date: -1 });
    if (carts.length === 0) {
      return res.status(404).json({ message: "No cart found" });
    }
    res.json(carts[0]); // Send latest cart
  } catch (err) {
    console.error("Fetch Cart Error:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

module.exports = router;
