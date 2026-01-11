import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/slices/favoritesSlice';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Favorites() {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-900 text-white p-8 max-w-7xl mx-auto pt-24"> 
      <h2 className="text-3xl font-bold mb-8 flex items-center justify-center">
        <FaHeart className="mr-2 hover:scale-110 hover:text-blue-300" /> Your Favorites
      </h2>
      {favorites.length === 0 ? (
        <p className="text-center">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(p => (
            <motion.div
              key={p._id}
              className="bg-blue-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
              whileHover={{ scale: 1.05 }}
            >
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mb-2">${p.price} {p.discount > 0 && <span className="text-green-400">({p.discount}% off)</span>}</p>
              <p className={p.stock > 0 ? 'text-green-400' : 'text-red-400'}>{p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}</p>
              <button
                onClick={() => dispatch(removeFromFavorites(p._id))}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mt-2 transition"
              >
                <FaTrash className="inline mr-1 hover:scale-110 hover:text-blue-300" /> Remove
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;