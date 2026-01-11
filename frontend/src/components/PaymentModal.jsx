import { useState } from 'react';
import ReviewModal from './ReviewModal';
import { FaCreditCard } from 'react-icons/fa';

function PaymentModal({ onClose }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [showReview, setShowReview] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment
    alert('Payment successful!');
    setShowReview(true);
  };

  if (showReview) return <ReviewModal onClose={onClose} />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <FaCreditCard className="mr-2 hover:scale-110 hover:text-blue-300" /> Payment
        </h2>
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block mb-2">Card Number:</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="w-full px-4 py-2 rounded border-none text-black"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2">Expiry (MM/YY):</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
                className="w-full px-4 py-2 rounded border-none text-black"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">CVV:</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                className="w-full px-4 py-2 rounded border-none text-black"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
          >
            Pay Now
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;
