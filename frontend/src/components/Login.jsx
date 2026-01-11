import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Login() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      dispatch(setAuth(res.data));
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white pt-20"> {/* Added pt-20 for fixed header */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <FaUser className="mr-2 hover:scale-110 hover:text-blue-300" /> Login
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded border-none text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded border-none text-black"
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,170,255,0.8)' }}
          transition={{ duration: 0.3 }}
        >
          <FaLock className="inline mr-1 hover:scale-110 hover:text-blue-300" /> Login
        </motion.button>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-300 hover:text-blue-100">Sign up</Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Login;