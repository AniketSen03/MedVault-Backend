const mongoose = require('mongoose');

// model.order.js
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address: String,
  deliveryInstructions: String,
  city: String,
  zip: Number,
  country: String,
  addressType: String,
  quantity: Number,
  paymentMethod: String,
  cardName: String,
  cardNumber: Number,
  expiry: String,
  cvv: String,
  billingPhone: Number,
  billingEmail: String,
  billingNote: String,
  gst: String,
  products: [
    {
      name: String,
      price: Number,
      image: String,
      quantity: Number,
    }
  ],
  total: Number,
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema,'Order');
