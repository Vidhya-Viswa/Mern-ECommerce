import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import axios from 'axios';
import Slider from 'react-slick';
import { FaShoppingBag, FaSearch, FaMapMarkerAlt, FaGift, FaStar, FaTrophy, FaSpinner } from 'react-icons/fa';
import { motion, useAnimation } from "framer-motion";
import Footer from './Footer';

function Home() {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('New York');
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState('');
  const controls = useAnimation();
  const dispatch = useDispatch();
  const { currency, rate } = useSelector(state => state.currency);
  const isSearching = search.trim() !== "";


  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products. Please try again.');
        setLoading(false);
        console.error('Error fetching products:', err);
      });
  }, []);

  const filteredProducts =
    search.trim() === ""
      ? products
      : products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true
  };

  const prizes = [
    { icon: <FaGift />, name: 'Free Shipping', color: 'text-green-400' },
    { icon: <FaStar />, name: '10% Discount', color: 'text-yellow-400' },
    { icon: <FaTrophy />, name: 'Exclusive Item', color: 'text-blue-400' },
    { icon: <FaSpinner />, name: 'Try Again', color: 'text-gray-400' }
  ];

  const spinWheel = async () => {
    setSpinning(true);
    setWinner('');
    await controls.start({ rotate: 360 * 5, transition: { duration: 2 } });
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    setWinner(randomPrize.name);
    setSpinning(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col pt-20">
      
      {/* Top Ad Banner */}

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-600 text-center py-4 px-4"
      >
        <p className="text-lg font-bold">🎉 Flash Sale: 30% Off on All Items! Limited Time! 🎉</p>
      </motion.div>

      {/* Hero */}

      <section className="text-center py-16 px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-blue-300"
        >
          Welcome to BlueWave E-Commerce
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl mb-8"
        >
          Discover amazing products. Shop now!
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,170,255,0.8)' }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/products"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg shadow-lg transition inline-block"
          >
            <FaShoppingBag className="inline mr-2 hover:scale-110 hover:text-blue-300" /> Browse Products
          </Link>
        </motion.div>
      </section>

      {/* Search & Location */}

      <section className="py-8 px-4 max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center">
          <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
            <FaSearch className="mr-2 hover:text-blue-300" />
          </motion.div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded border-none text-black"
          />
        </div>
        <div className="flex items-center">
          <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
            <FaMapMarkerAlt className="mr-2 hover:text-blue-300" />
          </motion.div>
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="px-4 py-2 rounded border-none text-black">
            <option>India</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
          </select>
        </div>
      </section>

      {/* Featured Products */}

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-300">
          {isSearching ? "Search Results" : "Featured Products"}
        </h2>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : isSearching ? (

          /* 🔷 GRID VIEW WHEN SEARCHING */

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(p => (
              <div
                key={p._id}
                className="bg-blue-900 rounded-xl shadow-lg p-4 flex flex-col"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h3 className="font-semibold text-center truncate">
                  {p.name}
                </h3>

                <p className="text-center mt-2">
                  {currency} {(p.price * rate).toFixed(2)}
                  {p.discount > 0 && (
                    <span className="text-green-400 ml-2">
                      ({p.discount}% OFF)
                    </span>
                  )}
                </p>

                <p
                  className={`text-sm text-center mt-1 ${p.stock > 0 ? "text-green-400" : "text-red-400"
                    }`}
                >
                  {p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}
                </p>

                <button
                  onClick={() => dispatch(addToCart(p))}
                  disabled={p.stock === 0}
                  className="mt-auto bg-blue-500 hover:bg-blue-600 py-2 rounded-lg transition disabled:opacity-50"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (

          /* 🔷 SLIDER VIEW WHEN NOT SEARCHING */

          <Slider {...sliderSettings}>
            {filteredProducts.slice(0, 10).map(p => (
              <div key={p._id} className="px-3">
                <div className="bg-blue-900 rounded-xl shadow-lg p-4 flex flex-col min-h-[420px]">

                  <img
                    src={p.image}
                    alt={p.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                    className="w-full h-44 object-cover rounded-lg mb-4"
                  />

                  <h3 className="text-lg font-semibold text-center line-clamp-1">
                    {p.name}
                  </h3>

                  <p className="text-center mt-2">
                    {currency} {(p.price * rate).toFixed(2)}
                  </p>

                  <p className={`text-sm text-center mt-1 ${p.stock > 0 ? "text-green-400" : "text-red-400"
                    }`}>
                    {p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}
                  </p>

                  <button
                    onClick={() => dispatch(addToCart(p))}
                    disabled={p.stock === 0}
                    className="mt-auto bg-blue-500 hover:bg-blue-600 py-2 rounded-lg transition disabled:opacity-50"
                  >
                    Add to Cart
                  </button>

                </div>
              </div>
            ))}
          </Slider>

        )}
      </section>

      {/* Lucky Draw Game */}

      <section className="py-8 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">Lucky Draw Winners - Spin to Win!</h2>
        <div className="bg-blue-800 p-8 rounded-lg shadow-lg">
          <motion.div
            animate={controls}
            className="flex justify-center items-center space-x-4 mb-6"
          >
            {prizes.map((prize, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                className={`text-4xl ${prize.color} hover:scale-110 transition`}
              >
                {prize.icon}
              </motion.div>
            ))}
          </motion.div>
          <button
            onClick={spinWheel}
            disabled={spinning}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg shadow-lg transition disabled:opacity-50"
          >
            {spinning ? 'Spinning...' : 'Spin the Wheel!'}
          </button>
          {winner && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-xl font-bold text-yellow-400"
            >
              🎉 You won: {winner}! 🎉
            </motion.p>
          )}
        </div>
      </section>

      {/* Customer Testimonials - Horizontal Row */}
      
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Customer Testimonials</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-center flex flex-col items-center w-72">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&P=0&h=180"
              alt="User"
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="flex-1">"Amazing quality and fast delivery!"</p>
            <p className="text-blue-300 mt-2">- John Doe</p>
          </div>

          <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-center flex flex-col items-center w-72">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?pid=Api&P=0&h=180"
              alt="User"
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="flex-1">"Love the discounts and variety."</p>
            <p className="text-blue-300 mt-2">- Jane Smith</p>
          </div>

          <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-center flex flex-col items-center w-72">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.kf9TvsuxepBOhAV4cTHEoAHaHa?pid=Api&P=0&h=180"
              alt="User"
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="flex-1">"Best e-commerce site ever!"</p>
            <p className="text-blue-300 mt-2">- Alex Johnson</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
