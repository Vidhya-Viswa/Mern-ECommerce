

const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  // Electronics (10)
  { name: 'Wireless Headphones', description: 'Noise-cancelling.', price: 99.99, image: '/assets/Electronics/Wireless-Headphones.jpeg', category: 'Electronics', stock: 50, discount: 10 },
  { name: 'Smartphone', description: 'Latest Android.', price: 699.99, image: '/assets/Electronics/Smartphone.jpeg', category: 'Electronics', stock: 20, discount: 15 },
  { name: 'Laptop', description: 'High-performance.', price: 1299.99, image: '/assets/Electronics/Laptop.jpeg', category: 'Electronics', stock: 10, discount: 20 },
  { name: 'Smartwatch', description: 'Fitness tracking.', price: 249.99, image: '/assets/Electronics/Smartwatch.jpeg', category: 'Electronics', stock: 30, discount: 5 },
  { name: 'Bluetooth Speaker', description: 'Portable.', price: 49.99, image: '/assets/Electronics/Bluetooth-Speaker.jpeg', category: 'Electronics', stock: 40, discount: 10 },
  { name: 'Tablet', description: '10-inch.', price: 399.99, image: '/assets/Electronics/Tablet.jpeg', category: 'Electronics', stock: 25, discount: 12 },
  { name: 'Gaming Mouse', description: 'RGB.', price: 29.99, image: '/assets/Electronics/Gaming-Mouse.jpeg', category: 'Electronics', stock: 60, discount: 8 },
  { name: 'Keyboard', description: 'Mechanical.', price: 79.99, image: '/assets/Electronics/Keyboard.jpeg', category: 'Electronics', stock: 35, discount: 10 },
  { name: 'Monitor', description: '4K UHD.', price: 499.99, image: '/assets/Electronics/Monitor.jpeg', category: 'Electronics', stock: 15, discount: 18 },
  { name: 'Router', description: 'Wi-Fi 6.', price: 89.99, image: '/assets/Electronics/Router.jpeg', category: 'Electronics', stock: 45, discount: 5 },
  // Clothing (10)
  { name: 'T-Shirt', description: 'Cotton.', price: 19.99, image: '/assets/Clothing/T-Shirt.jpeg', category: 'Clothing', stock: 100, discount: 10 },
  { name: 'Jeans', description: 'Denim.', price: 49.99, image: '/assets/Clothing/Jeans.jpeg', category: 'Clothing', stock: 80, discount: 15 },
  { name: 'Jacket', description: 'Winter.', price: 89.99, image: '/assets/Clothing/Jacket.jpeg', category: 'Clothing', stock: 60, discount: 20 },
  { name: 'Sneakers', description: 'Running.', price: 79.99, image: '/assets/Clothing/Sneakers.jpeg', category: 'Clothing', stock: 70, discount: 10 },
  { name: 'Hat', description: 'Baseball.', price: 14.99, image: '/assets/Clothing/Hat.jpeg', category: 'Clothing', stock: 90, discount: 5 },
  { name: 'Dress', description: 'Elegant.', price: 59.99, image: '/assets/Clothing/Dress.jpeg', category: 'Clothing', stock: 40, discount: 12 },
  { name: 'Sweater', description: 'Wool.', price: 39.99, image: '/assets/Clothing/Sweater.jpeg', category: 'Clothing', stock: 55, discount: 8 },
  { name: 'Shorts', description: 'Casual.', price: 24.99, image: '/assets/Clothing/Shorts.jpeg', category: 'Clothing', stock: 75, discount: 10 },
  { name: 'Shoes', description: 'Formal.', price: 99.99, image: '/assets/Clothing/Shoes.jpeg', category: 'Clothing', stock: 50, discount: 15 },
  { name: 'Belt', description: 'Leather.', price: 19.99, image: '/assets/Clothing/Belt.jpeg', category: 'Clothing', stock: 85, discount: 5 },
  // Home & Garden (10)
  { name: 'Coffee Maker', description: 'Automatic.', price: 59.99, image: '/assets/Home/Coffee-Maker.jpeg', category: 'Home & Garden', stock: 25, discount: 10 },
  { name: 'Lamp', description: 'Desk.', price: 29.99, image: '/assets/Home/Lamp.jpeg', category: 'Home & Garden', stock: 35, discount: 15 },
  { name: 'Plant Pot', description: 'Ceramic.', price: 9.99, image: '/assets/Home/Plant-Pot.jpeg', category: 'Home & Garden', stock: 200, discount: 20 },
  { name: 'Blanket', description: 'Fleece.', price: 39.99, image: '/assets/Home/Blanket.jpeg', category: 'Home & Garden', stock: 45, discount: 5 },
  { name: 'Chair', description: 'Office.', price: 149.99, image: '/assets/Home/Chair.jpeg', category: 'Home & Garden', stock: 15, discount: 12 },
  { name: 'Cushion', description: 'Decorative.', price: 19.99, image: '/assets/Home/Cushion.jpeg', category: 'Home & Garden', stock: 65, discount: 8 },
  { name: 'Vase', description: 'Glass.', price: 14.99, image: '/assets/Home/Vase.jpeg', category: 'Home & Garden', stock: 50, discount: 10 },
  { name: 'Bookshelf', description: 'Wooden.', price: 99.99, image: '/assets/Home/Bookshelf.jpeg', category: 'Home & Garden', stock: 20, discount: 15 },
  { name: 'Curtains', description: 'Window.', price: 49.99, image: '/assets/Home/Curtains.jpeg', category: 'Home & Garden', stock: 30, discount: 10 },
  { name: 'Rug', description: 'Floor.', price: 79.99, image: '/assets/Home/Rug.jpeg', category: 'Home & Garden', stock: 40, discount: 5 },
  // Groceries (10)
  { name: 'Rice', description: 'Basmati.', price: 9.99, image: '/assets/Groceries/Rice.jpeg', category: 'Groceries', stock: 100, discount: 10 },
  { name: 'Milk', description: 'Fresh.', price: 2.99, image: '/assets/Groceries/Milk.jpeg', category: 'Groceries', stock: 200, discount: 5 },
  { name: 'Bread', description: 'Whole wheat.', price: 1.99, image: '/assets/Groceries/Bread.jpeg', category: 'Groceries', stock: 150, discount: 8 },
  { name: 'Eggs', description: 'Dozen.', price: 3.99, image: '/assets/Groceries/Eggs.jpeg', category: 'Groceries', stock: 80, discount: 10 },
  { name: 'Apples', description: 'Fresh.', price: 4.99, image: '/assets/Groceries/Apples.jpeg', category: 'Groceries', stock: 120, discount: 15 },
  { name: 'Chicken', description: 'Boneless.', price: 12.99, image: '/assets/Groceries/Chicken.jpeg', category: 'Groceries', stock: 60, discount: 12 },
  { name: 'Pasta', description: 'Italian.', price: 2.49, image: '/assets/Groceries/Pasta.jpeg', category: 'Groceries', stock: 90, discount: 5 },
  { name: 'Tea', description: 'Green.', price: 5.99, image: '/assets/Groceries/Tea.jpeg', category: 'Groceries', stock: 70, discount: 10 },
  { name: 'Sugar', description: 'White.', price: 1.49, image: '/assets/Groceries/Sugar.jpeg', category: 'Groceries', stock: 110, discount: 8 },
  { name: 'Oil', description: 'Olive.', price: 7.99, image: '/assets/Groceries/Oil.jpeg', category: 'Groceries', stock: 50, discount: 15 },
  // Books (10)
  { name: 'Fiction Novel', description: 'Bestseller.', price: 14.99, image: '/assets/Books/Fiction-Novel.jpeg', category: 'Books', stock: 40, discount: 10 },
  { name: 'Cookbook', description: 'Recipes.', price: 19.99, image: '/assets/Books/Cookbook.jpeg', category: 'Books', stock: 30, discount: 15 },
  { name: 'Biography', description: 'Inspiring.', price: 24.99, image: '/assets/Books/Biography.jpeg', category: 'Books', stock: 25, discount: 20 },
  { name: 'Science Book', description: 'Physics.', price: 29.99, image: '/assets/Books/Science-Book.jpeg', category: 'Books', stock: 20, discount: 5 },
  { name: 'Children Book', description: 'Fun.', price: 9.99, image: '/assets/Books/Children-Book.jpeg', category: 'Books', stock: 50, discount: 10 },
  { name: 'History Book', description: 'Ancient.', price: 34.99, image: '/assets/Books/History-Book.jpeg', category: 'Books', stock: 15, discount: 12 },
  { name: 'Poetry', description: 'Classic.', price: 12.99, image: '/assets/Books/Poetry.jpeg', category: 'Books', stock: 35, discount: 8 },
  { name: 'Self-Help', description: 'Motivational.', price: 16.99, image: '/assets/Books/Self-Help.jpeg', category: 'Books', stock: 45, discount: 10 },
  { name: 'Mystery', description: 'Thriller.', price: 18.99, image: '/assets/Books/Mystery.jpeg', category: 'Books', stock: 28, discount: 15 },
  { name: 'Art Book', description: 'Illustrated.', price: 39.99, image: '/assets/Books/Art-Book.jpeg', category: 'Books', stock: 18, discount: 5 },
  // Sports (10)
  { name: 'Basketball', description: 'Official.', price: 29.99, image: '/assets/Sports/Basketball.jpeg', category: 'Sports', stock: 60, discount: 10 },
  { name: 'Tennis Racket', description: 'Pro.', price: 89.99, image: '/assets/Sports/Tennis-Racket.jpeg', category: 'Sports', stock: 25, discount: 15 },
  { name: 'Yoga Mat', description: 'Non-slip.', price: 19.99, image: '/assets/Sports/Yoga-Mat.jpeg', category: 'Sports', stock: 70, discount: 20 },
  { name: 'Dumbbells', description: 'Set of 2.', price: 49.99, image: '/assets/Sports/Dumbbells.jpeg', category: 'Sports', stock: 40, discount: 5 },
  { name: 'Soccer Ball', description: 'Professional.', price: 24.99, image: '/assets/Sports/Soccer-Ball.jpeg', category: 'Sports', stock: 55, discount: 10 },
  { name: 'Swimming Goggles', description: 'Anti-fog.', price: 14.99, image: '/assets/Sports/Swimming-Goggles.jpeg', category: 'Sports', stock: 80, discount: 8 },
  { name: 'Cycling Helmet', description: 'Safety.', price: 39.99, image: '/assets/Sports/Cycling-Helmet.jpeg', category: 'Sports', stock: 35, discount: 12 },
  { name: 'Boxing Gloves', description: 'Leather.', price: 59.99, image: '/assets/Sports/Boxing-Gloves.jpeg', category: 'Sports', stock: 20, discount: 15 },
  { name: 'Running Shoes', description: 'Lightweight.', price: 79.99, image: '/assets/Sports/Running-Shoes.jpeg', category: 'Sports', stock: 45, discount: 10 },
  { name: 'Treadmill', description: 'Home use.', price: 499.99, image: '/assets/Sports/Treadmill.jpeg', category: 'Sports', stock: 10, discount: 18 },
  // Beauty (10)
  { name: 'Lipstick', description: 'Matte.', price: 9.99, image: '/assets/Beauty/Lipstick.jpeg', category: 'Beauty', stock: 120, discount: 10 },
  { name: 'Foundation', description: 'Liquid.', price: 19.99, image: '/assets/Beauty/Foundation.jpeg', category: 'Beauty', stock: 80, discount: 15 },
  { name: 'Shampoo', description: 'Herbal.', price: 7.99, image: '/assets/Beauty/Shampoo.jpeg', category: 'Beauty', stock: 150, discount: 5 },
  { name: 'Perfume', description: 'Floral.', price: 49.99, image: '/assets/Beauty/Perfume.jpeg', category: 'Beauty', stock: 60, discount: 20 },
  { name: 'Nail Polish', description: 'Red.', price: 4.99, image: '/assets/Beauty/Nail-Polish.jpeg', category: 'Beauty', stock: 200, discount: 10 },
  { name: 'Moisturizer', description: 'Hydrating.', price: 14.99, image: '/assets/Beauty/Moisturizer.jpeg', category: 'Beauty', stock: 90, discount: 12 },
  { name: 'Eyeliner', description: 'Black.', price: 6.99, image: '/assets/Beauty/Eyeliner.jpeg', category: 'Beauty', stock: 110, discount: 8 },
  { name: 'Hair Brush', description: 'Bristle.', price: 12.99, image: '/assets/Beauty/Hair-Brush.jpeg', category: 'Beauty', stock: 70, discount: 10 },
  { name: 'Sunscreen', description: 'SPF 50.', price: 24.99, image: '/assets/Beauty/Sunscreen.jpeg', category: 'Beauty', stock: 85, discount: 15 },
  { name: 'Face Wash', description: 'Foaming.', price: 8.99, image: '/assets/Beauty/Face-Wash.jpeg', category: 'Beauty', stock: 130, discount: 5 },
];

Product.insertMany(products).then(() => {
  console.log('Products seeded');
  mongoose.connection.close();
}).catch(err => console.log(err));