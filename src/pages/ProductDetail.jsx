import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuItems } from '../data/menuData';
import { useCart } from '../context/CartContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiPlus, FiMinus, FiShoppingCart, FiInfo } = FiIcons;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const item = menuItems.find(item => item.id === parseInt(id));
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeTab, setActiveTab] = useState('description');

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
            Item Not Found
          </h2>
          <button
            onClick={() => navigate('/menu')}
            className="bg-burgundy-700 text-white px-6 py-3 rounded-md hover:bg-burgundy-600 transition-colors font-opensans"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const handleOptionChange = (optionType, optionValue) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionType]: optionValue
    }));
  };

  const calculateTotalPrice = () => {
    let total = item.price;
    
    Object.entries(selectedOptions).forEach(([optionType, selectedOption]) => {
      if (item.options && item.options[optionType]) {
        const option = item.options[optionType].find(opt => opt.name === selectedOption);
        if (option) {
          total += option.price;
        }
      }
    });
    
    return total * quantity;
  };

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: calculateTotalPrice() / quantity,
      image: item.image,
      quantity: quantity,
      options: selectedOptions
    });
    
    // Show success message (you can implement a toast notification here)
    alert('Item added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/menu')}
            className="flex items-center space-x-2 text-gray-600 hover:text-burgundy-700 transition-colors font-opensans"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            <span>Back to Menu</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                {item.isPopular && (
                  <span className="bg-burgundy-700 text-white px-3 py-1 rounded-full text-sm font-opensans">
                    Popular
                  </span>
                )}
                {item.isVegan && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-opensans">
                    🌱 Vegan
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
                {item.name}
              </h1>
              <p className="text-3xl font-bold text-burgundy-700">
                ${calculateTotalPrice().toFixed(2)}
              </p>
            </div>

            {/* Options */}
            {item.options && Object.entries(item.options).map(([optionType, options]) => (
              <div key={optionType} className="space-y-3">
                <h3 className="text-lg font-playfair font-semibold text-gray-900 capitalize">
                  {optionType}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {options.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => handleOptionChange(optionType, option.name)}
                      className={`p-3 rounded-md border text-left transition-colors ${
                        selectedOptions[optionType] === option.name
                          ? 'border-burgundy-700 bg-burgundy-50 text-burgundy-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-opensans font-medium">{option.name}</div>
                      {option.price > 0 && (
                        <div className="text-sm text-gray-500">+${option.price}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-lg font-playfair font-semibold text-gray-900">
                Quantity
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <SafeIcon icon={FiMinus} className="w-4 h-4" />
                </button>
                <span className="text-xl font-opensans font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-burgundy-700 text-white py-4 rounded-lg hover:bg-burgundy-600 transition-colors font-opensans font-semibold text-lg flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
              <span>Add to Cart - ${calculateTotalPrice().toFixed(2)}</span>
            </button>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'ingredients', label: 'Ingredients' },
                { id: 'nutrition', label: 'Nutrition' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-opensans font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-burgundy-700 text-burgundy-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 font-opensans text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                  Ingredients
                </h3>
                <ul className="grid grid-cols-2 gap-2">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2 font-opensans text-gray-700">
                      <span className="w-2 h-2 bg-burgundy-700 rounded-full"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div>
                <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                  Nutritional Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(item.nutritionalInfo).map(([key, value]) => (
                    <div key={key} className="bg-gray-100 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-burgundy-700">{value}</div>
                      <div className="text-sm text-gray-600 font-opensans capitalize">
                        {key === 'calories' ? 'Calories' : `${key} (g)`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;