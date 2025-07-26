const express = require('express');
const router = express.Router();
const Order = require('../models/model.order');

// Create Order
router.post('/order', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully!', order });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ message: 'Failed to place order.' });
  }
});

module.exports = router;
