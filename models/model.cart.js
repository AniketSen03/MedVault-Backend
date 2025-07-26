const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      image: String,
      quantity: Number,
    },
  ],
  user: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", CartSchema, "Cart");
