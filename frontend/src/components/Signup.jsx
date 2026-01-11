import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus, FaUser, FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slices/authSlice';
import { motion } from 'framer-motion';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      
      // Automatically log them in
      const loginRes = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      dispatch(setAuth(loginRes.data));
      
      // Redirect to homepage
      navigate('/');
    } catch (err) {
      alert('Signup failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white pt-20">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <FaUserPlus className="mr-2 hover:scale-110 hover:text-blue-300" /> Sign Up
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded border-none text-black"
          />
        </div>
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
          <FaUser className="inline mr-1 hover:scale-110 hover:text-blue-300" /> Sign Up
        </motion.button>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-300 hover:text-blue-100">Login</Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Signup;