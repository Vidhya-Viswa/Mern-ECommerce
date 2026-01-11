import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaymentModal from './PaymentModal';

function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const { token, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user || !token) {
      alert('Please log in to proceed with payment.');
      navigate('/login');
      return;
    }
    // Proceed to payment if logged in
    axios.post('http://localhost:5000/api/orders', { products: cartItems, total }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setShowPayment(true))
      .catch(err => alert('Checkout failed: ' + (err.response?.data?.error || 'Unknown error')));
  };

  return (
    <div className="bg-gray-900 text-white p-8 max-w-4xl mx-auto pt-24">
      <h2 className="text-3xl font-bold mb-8 flex items-center">
        <FaShoppingCart className="mr-2" /> Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="bg-blue-800 p-4 rounded-lg shadow-lg flex justify-between items-center">
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
            <button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg mt-4 transition"
            >
              Pay Now
            </button>
          </div>
        </>
      )}
      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
    </div>
  );
}

export default Cart;