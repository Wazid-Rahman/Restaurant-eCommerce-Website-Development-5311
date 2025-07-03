import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiLock, FiShield } = FiIcons;

const PaymentForm = ({ paymentMethod, setPaymentMethod, paymentInfo, handlePaymentInfoChange }) => {
  const [cardType, setCardType] = useState('');

  const detectCardType = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.match(/^4/)) return 'visa';
    if (cleaned.match(/^5[1-5]/)) return 'mastercard';
    if (cleaned.match(/^3[47]/)) return 'amex';
    return '';
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/);
    if (match) {
      const formatted = [match[1], match[2], match[3], match[4]]
        .filter(Boolean)
        .join(' ');
      setCardType(detectCardType(cleaned));
      return formatted;
    }
    return value;
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: FiCreditCard, popular: true },
    { id: 'paypal', label: 'PayPal', icon: FiCreditCard },
    { id: 'apple-pay', label: 'Apple Pay', icon: FiCreditCard },
    { id: 'cash', label: 'Cash on Delivery', icon: FiCreditCard }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
          Payment Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <motion.button
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPaymentMethod(method.id)}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                paymentMethod === method.id
                  ? 'border-burgundy-700 bg-burgundy-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <SafeIcon icon={method.icon} className="w-5 h-5 text-burgundy-700" />
                <span className="font-opensans font-medium text-gray-900">
                  {method.label}
                </span>
              </div>
              {method.popular && (
                <span className="absolute -top-2 -right-2 bg-burgundy-700 text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {paymentMethod === 'card' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600 font-opensans">
            <SafeIcon icon={FiShield} className="w-4 h-4 text-green-600" />
            <span>Your payment information is encrypted and secure</span>
          </div>

          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    if (formatted.replace(/\s/g, '').length <= 16) {
                      handlePaymentInfoChange('cardNumber', formatted);
                    }
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                  required
                />
                <SafeIcon 
                  icon={FiCreditCard} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                />
                {cardType && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs font-medium text-gray-600 uppercase">
                      {cardType}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={paymentInfo.cardholderName}
                onChange={(e) => handlePaymentInfoChange('cardholderName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                required
              />
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value);
                    if (formatted.length <= 5) {
                      handlePaymentInfoChange('expiryDate', formatted);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        handlePaymentInfoChange('cvv', value);
                      }
                    }}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                    required
                  />
                  <SafeIcon 
                    icon={FiLock} 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {paymentMethod === 'paypal' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center"
        >
          <p className="text-blue-800 font-opensans">
            You will be redirected to PayPal to complete your payment securely.
          </p>
        </motion.div>
      )}

      {paymentMethod === 'apple-pay' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center"
        >
          <p className="text-gray-800 font-opensans">
            Use Touch ID or Face ID to pay with Apple Pay.
          </p>
        </motion.div>
      )}

      {paymentMethod === 'cash' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-6 bg-green-50 border border-green-200 rounded-lg"
        >
          <h4 className="font-opensans font-semibold text-green-800 mb-2">
            Cash on Delivery
          </h4>
          <p className="text-green-700 font-opensans text-sm">
            Pay with cash when your order arrives. Please have exact change ready.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentForm;