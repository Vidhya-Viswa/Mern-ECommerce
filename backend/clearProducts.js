const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('All products deleted!');

    process.exit(0);
  })
  
  .catch(err => {
    console.log('Error:', err);
    process.exit(1);
  });
