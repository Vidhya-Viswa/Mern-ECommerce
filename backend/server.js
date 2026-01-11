const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express(); 

// Middleware

app.use(cors({
  origin: "https://mern-e-commerce-nine-ivory.vercel.app"
}));
app.use(express.json());

// ✅ Serve local images (AFTER app is created)

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// MongoDB

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB error:", err));

// Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

//Render Route

app.get("/", (req, res) => {
  res.send("MERN E-Commerce Backend is running 🚀");
});
