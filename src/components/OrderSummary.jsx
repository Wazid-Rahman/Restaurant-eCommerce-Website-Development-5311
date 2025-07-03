import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTag, FiTruck, FiClock } = FiIcons;

const OrderSummary = ({ 
  items, 
  subtotal, 
  deliveryFee, 
  discount, 
  tip, 
  total, 
  orderType,
  estimatedTime,
  coupon 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-lg p-6 sticky top-4"
    >
      <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
        Order Summary
      </h3>

      {/* Items */}
      <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <div className="flex-1">
              <span className="font-opensans text-gray-900">{item.name}</span>
              <span className="text-gray-500 ml-1">x{item.quantity}</span>
              {item.options && Object.entries(item.options).length > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {Object.entries(item.options).map(([key, value]) => (
                    <span key={key} className="mr-2">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="font-opensans text-gray-900 ml-4">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm font-opensans">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

        {deliveryFee > 0 && (
          <div className="flex justify-between text-sm font-opensans">
            <span className="text-gray-600">Delivery Fee:</span>
            <span className="text-gray-900">${deliveryFee.toFixed(2)}</span>
          </div>
        )}

        {deliveryFee === 0 && orderType === 'delivery' && (
          <div className="flex justify-between text-sm font-opensans">
            <span className="text-gray-600">Delivery Fee:</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-sm font-opensans">
            <div className="flex items-center text-green-600">
              <SafeIcon icon={FiTag} className="w-4 h-4 mr-1" />
              <span>Discount ({coupon?.code}):</span>
            </div>
            <span className="text-green-600">-${discount.toFixed(2)}</span>
          </div>
        )}

        {tip > 0 && (
          <div className="flex justify-between text-sm font-opensans">
            <span className="text-gray-600">Tip:</span>
            <span className="text-gray-900">${tip.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-900">Total:</span>
            <span className="text-burgundy-700">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Order Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm font-opensans">
          <div className="flex items-center text-gray-600">
            <SafeIcon icon={FiTruck} className="w-4 h-4 mr-2" />
            <span>Order Type:</span>
          </div>
          <span className="text-gray-900 capitalize">{orderType}</span>
        </div>
        
        {estimatedTime && (
          <div className="flex items-center justify-between text-sm font-opensans mt-2">
            <div className="flex items-center text-gray-600">
              <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
              <span>Estimated Time:</span>
            </div>
            <span className="text-gray-900">{estimatedTime}</span>
          </div>
        )}
      </div>

      {/* Free Delivery Banner */}
      {orderType === 'delivery' && deliveryFee > 0 && subtotal < 50 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700 font-opensans text-center">
            Add ${(50 - subtotal).toFixed(2)} more for free delivery!
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default OrderSummary;