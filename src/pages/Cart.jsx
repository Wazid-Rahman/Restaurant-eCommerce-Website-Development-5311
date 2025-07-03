import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { coupons } from '../data/menuData';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiMinus, FiTrash2, FiShoppingCart, FiTag } = FiIcons;

const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    coupon,
    applyCoupon,
    removeCoupon 
  } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 50 ? 0 : 5.99;
  const discount = coupon ? (subtotal * coupon.discount) / 100 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleApplyCoupon = () => {
    const validCoupon = coupons.find(c => c.code === couponCode.toUpperCase());
    
    if (!validCoupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    
    if (subtotal < validCoupon.minOrder) {
      setCouponError(`Minimum order of $${validCoupon.minOrder} required`);
      return;
    }
    
    applyCoupon(validCoupon);
    setCouponCode('');
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponError('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <SafeIcon icon={FiShoppingCart} className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 font-opensans mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/menu"
            className="bg-burgundy-700 text-white px-6 py-3 rounded-md hover:bg-burgundy-600 transition-colors font-opensans"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-playfair font-bold text-gray-900">
            Shopping Cart
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-playfair font-semibold text-gray-900">
                    Cart Items ({items.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 font-opensans text-sm"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.cartId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-playfair font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      
                      {/* Options */}
                      {item.options && Object.entries(item.options).length > 0 && (
                        <div className="text-sm text-gray-600 font-opensans">
                          {Object.entries(item.options).map(([key, value]) => (
                            <span key={key} className="mr-2">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="text-burgundy-700 font-bold">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <SafeIcon icon={FiMinus} className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-opensans font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <SafeIcon icon={FiPlus} className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <h2 className="text-xl font-playfair font-semibold text-gray-900">
                Order Summary
              </h2>

              {/* Coupon Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiTag} className="w-5 h-5 text-gray-600" />
                  <span className="font-opensans font-medium text-gray-900">
                    Coupon Code
                  </span>
                </div>
                
                {coupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                    <div>
                      <div className="font-opensans font-medium text-green-800">
                        {coupon.code}
                      </div>
                      <div className="text-sm text-green-600">
                        {coupon.description}
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-600 hover:text-red-700"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="bg-burgundy-700 text-white px-4 py-2 rounded-md hover:bg-burgundy-600 transition-colors font-opensans"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-red-600 text-sm font-opensans">{couponError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between font-opensans">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-opensans">
                  <span>Delivery Fee:</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between font-opensans text-green-600">
                    <span>Discount:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Info */}
              {deliveryFee > 0 && (
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm text-blue-700 font-opensans">
                    Add ${(50 - subtotal).toFixed(2)} more for free delivery!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-burgundy-700 text-white py-3 rounded-md hover:bg-burgundy-600 transition-colors font-opensans font-semibold text-center block"
              >
                Proceed to Checkout
              </Link>

              {/* Continue Shopping */}
              <Link
                to="/menu"
                className="w-full text-center text-burgundy-700 hover:text-burgundy-600 font-opensans block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;