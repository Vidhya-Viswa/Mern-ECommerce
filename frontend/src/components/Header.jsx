import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { setCurrency } from '../redux/slices/currencySlice';
import { FaShoppingCart, FaUser, FaHome, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Header() {
  const { user } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);
  const { currency } = useSelector(state => state.currency);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCurrencyChange = (newCurrency) => {
    const rate = newCurrency === 'INR' ? 83 : 1;
    dispatch(setCurrency({ currency: newCurrency, rate }));
  };

  return (
    <header className="fixed top-0 w-full bg-gray-900 text-white p-4 shadow-lg z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Shop Name */}
        <div className="flex items-center">
          <motion.h1
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-2xl font-bold text-blue-300"
          >
            BlueWave E-Commerce
          </motion.h1>
        </div>

        {/* Center: Home, Products, Favorites */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-blue-300 transition">
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.3 }}>
              <FaHome className="inline mr-1" /> Home
            </motion.div>
          </Link>
          <Link to="/products" className="text-white hover:text-blue-300 transition">
            Products
          </Link>
          <Link to="/favorites" className="text-white hover:text-blue-300 transition">
            <motion.div whileHover={{ scale: 1.1, rotate: -5 }} transition={{ duration: 0.3 }}>
              <FaHeart className="inline mr-1" /> Favorites
            </motion.div>
          </Link>
        </div>

        {/* Right: USD, Cart, Login */}
        <div className="hidden md:flex items-center space-x-4">
          <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="px-2 py-1 rounded border-none text-black"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
          <Link to="/cart" className="text-white hover:text-blue-300 transition">
            <motion.div whileHover={{ scale: 1.1, y: -5 }} transition={{ duration: 0.3 }}>
              <FaShoppingCart className="inline mr-1" /> Cart ({cartItems.length})
            </motion.div>
          </Link>
          {user ? (
            <button onClick={() => dispatch(logout())} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white hover:text-blue-300 transition">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <FaUser className="inline mr-1" /> Login
              </motion.div>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
            {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </motion.div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-blue-800 p-4 mt-4 rounded-lg"
        >
          <Link to="/" className="block text-white hover:text-blue-300 py-2" onClick={() => setMenuOpen(false)}>
            <FaHome className="inline mr-1" /> Home
          </Link>
          <Link to="/products" className="block text-white hover:text-blue-300 py-2" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link to="/favorites" className="block text-white hover:text-blue-300 py-2" onClick={() => setMenuOpen(false)}>
            <FaHeart className="inline mr-1" /> Favorites
          </Link>
          <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="w-full px-2 py-1 rounded border-none text-black mt-2"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
          <Link to="/cart" className="block text-white hover:text-blue-300 py-2" onClick={() => setMenuOpen(false)}>
            <FaShoppingCart className="inline mr-1" /> Cart ({cartItems.length})
          </Link>
          {user ? (
            <button
              onClick={() => {
                dispatch(logout());
                setMenuOpen(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 px-3 py-1 rounded mt-2"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block text-white hover:text-blue-300 py-2" onClick={() => setMenuOpen(false)}>
              <FaUser className="inline mr-1" /> Login
            </Link>
          )}
        </motion.div>
      )}
    </header>
  );
}

export default Header;