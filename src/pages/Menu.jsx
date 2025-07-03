import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuCategories, menuItems } from '../data/menuData';
import { useCart } from '../context/CartContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiFilter, FiSearch } = FiIcons;

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showVeganOnly, setShowVeganOnly] = useState(false);
  const { addToCart } = useCart();

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVegan = !showVeganOnly || item.isVegan;
    
    return matchesCategory && matchesSearch && matchesVegan;
  });

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      options: {}
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-burgundy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-opensans text-beige-100"
          >
            Discover authentic Italian flavors crafted with passion
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-opensans font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-burgundy-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Items
            </button>
            {menuCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-opensans font-medium transition-colors flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-burgundy-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Vegan Filter */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="vegan-filter"
              checked={showVeganOnly}
              onChange={(e) => setShowVeganOnly(e.target.checked)}
              className="w-4 h-4 text-burgundy-700 border-gray-300 rounded focus:ring-burgundy-700"
            />
            <label htmlFor="vegan-filter" className="font-opensans text-gray-700">
              Show vegan options only 🌱
            </label>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  {item.isPopular && (
                    <span className="bg-burgundy-700 text-white px-2 py-1 rounded-full text-xs font-opensans">
                      Popular
                    </span>
                  )}
                  {item.isVegan && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-opensans">
                      🌱 Vegan
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 font-opensans text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                {/* Nutritional Info */}
                <div className="text-xs text-gray-500 font-opensans mb-4">
                  {item.nutritionalInfo.calories} cal | 
                  {item.nutritionalInfo.protein}g protein | 
                  {item.nutritionalInfo.carbs}g carbs
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-burgundy-700">
                    ${item.price}
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      to={`/product/${item.id}`}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors font-opensans text-sm"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-burgundy-700 text-white px-4 py-2 rounded-md hover:bg-burgundy-600 transition-colors font-opensans text-sm flex items-center space-x-1"
                    >
                      <SafeIcon icon={FiPlus} className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-opensans text-lg">
              No items found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;