import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiMail, FiMapPin, FiClock, FiFacebook, FiInstagram, FiTwitter } = FiIcons;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-playfair font-bold text-beige-300">Delizio</h3>
            <p className="text-gray-300 font-opensans">
              Experience authentic Italian cuisine with fresh ingredients and traditional recipes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-beige-300 transition-colors">
                <SafeIcon icon={FiFacebook} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-beige-300 transition-colors">
                <SafeIcon icon={FiInstagram} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-beige-300 transition-colors">
                <SafeIcon icon={FiTwitter} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-playfair font-semibold text-beige-300">Quick Links</h4>
            <ul className="space-y-2 font-opensans">
              <li><Link to="/menu" className="text-gray-300 hover:text-beige-300 transition-colors">Menu</Link></li>
              <li><Link to="/reservation" className="text-gray-300 hover:text-beige-300 transition-colors">Reservations</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-beige-300 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-beige-300 transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-beige-300 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-playfair font-semibold text-beige-300">Contact</h4>
            <div className="space-y-3 font-opensans">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-beige-300" />
                <span className="text-gray-300">123 Italian Street, Food City, FC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="w-5 h-5 text-beige-300" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="w-5 h-5 text-beige-300" />
                <span className="text-gray-300">info@delizio.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-playfair font-semibold text-beige-300">Newsletter</h4>
            <p className="text-gray-300 font-opensans text-sm">
              Subscribe for exclusive offers and updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-beige-300"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-burgundy-700 text-white py-2 rounded-md hover:bg-burgundy-600 transition-colors font-opensans"
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <SafeIcon icon={FiClock} className="w-5 h-5 text-beige-300" />
              <span className="text-gray-300 font-opensans">
                Mon-Thu: 11:00 AM - 10:00 PM | Fri-Sat: 11:00 AM - 11:00 PM | Sun: 12:00 PM - 9:00 PM
              </span>
            </div>
            <div className="text-gray-300 font-opensans text-sm">
              © 2024 Delizio. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;