const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Create order (checkout) - Reduces stock of products

router.post('/', auth, async (req, res) => {
  const { products, total } = req.body;
  try {
    console.log('Processing order for products:', products); 
    for (const item of products) {
      console.log(`Reducing stock for product ${item.product} by ${item.quantity}`); 
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }
    const order = new Order({ ...req.body, user: req.user.id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Order error:', err); 
    res.status(500).json({ error: 'Order failed' });
  }
});

// Get user's orders

router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('products.product');
  res.json(orders);
});

module.exports = router;