import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToFavorites } from '../redux/slices/favoritesSlice';
import axios from 'axios';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({
    Electronics: true, Clothing: true, 'Home & Garden': true, Groceries: true, Books: true, Sports: true, Beauty: true
  });
  const [favoriteMessage, setFavoriteMessage] = useState('');
  const dispatch = useDispatch();
  const { currency, rate } = useSelector(state => state.currency);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then(res => setProducts(res.data));
  }, []);

  const filteredProducts = products.filter(p => categories[p.category]);

  const handleCategoryChange = (cat) => {
    setCategories({ ...categories, [cat]: !categories[cat] });
  };

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product)); // Fixed: Pass full product object
    setFavoriteMessage('Product added to favorites!');
    setTimeout(() => setFavoriteMessage(''), 3000);
  };

  return (
    <div className="bg-gray-900 text-white p-8 max-w-7xl mx-auto pt-24">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>

      {favoriteMessage && (
        <div className="bg-green-500 text-white p-4 rounded mb-4 text-center">
          {favoriteMessage}
        </div>
      )}

      {/* Category Checkboxes */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {Object.keys(categories).map(cat => (
          <label key={cat} className="flex items-center">
            <input
              type="checkbox"
              checked={categories[cat]}
              onChange={() => handleCategoryChange(cat)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(p => (
          <motion.div
            key={p._id}
            className="bg-blue-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            
              <div className="w-full h-48 overflow-hidden rounded mb-4">
  <img
    src={p.image}
    alt={p.name}
    className="w-full h-full object-cover"
  />
</div>

            

            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="mb-2">{currency} {(p.price * rate).toFixed(2)} {p.discount > 0 && <span className="text-green-400">({p.discount}% off)</span>}</p>
            <p className={p.stock > 0 ? 'text-green-400' : 'text-red-400'}>{p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => dispatch(addToCart(p))}
                disabled={p.stock === 0}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition disabled:opacity-50"
              >
                <FaShoppingCart className="inline mr-1 hover:scale-110 hover:text-blue-300" /> Add to Cart
              </button>
              <button
                onClick={() => handleAddToFavorites(p)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                <FaHeart className="inline mr-1 hover:scale-110 hover:text-blue-300" /> Favorite
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Products;