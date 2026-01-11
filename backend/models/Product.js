const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  discount: { type: Number, default: 0 }  // New: Discount percentage
});

module.exports = mongoose.model('Product', productSchema);