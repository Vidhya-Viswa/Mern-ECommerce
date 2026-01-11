import { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}! (Integrate with email service)`);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">BlueWave E-Commerce</h3>
          <p className="mb-4">Your go-to shop for quality products. Quality and style in every purchase.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-300 hover:text-blue-100 transition"><FaFacebook /></a>
            <a href="#" className="text-blue-300 hover:text-blue-100 transition"><FaTwitter /></a>
            <a href="#" className="text-blue-300 hover:text-blue-100 transition"><FaInstagram /></a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-300 transition">About Us</a></li>
            <li><a href="#" className="hover:text-blue-300 transition">Contact</a></li>
            <li><a href="#" className="hover:text-blue-300 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-300 transition">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <form onSubmit={handleNewsletter} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 rounded border-none text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              <FaEnvelope className="inline mr-1" /> Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-blue-700 pt-4">
        <p>&copy; 2026 BlueWave E-Commerce. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;