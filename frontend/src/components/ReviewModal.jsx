import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function ReviewModal({ onClose }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback! Rating: ${rating}, Feedback: ${feedback}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">How was your journey?</h2>
        <p className="mb-4">Your feedback helps us improve!</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Rating:</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-2 rounded border-none text-black"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
          >
            Submit Feedback
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ReviewModal;