import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart } = FiIcons;

const TipSelector = ({ tip, setTip, subtotal }) => {
  const tipOptions = [
    { amount: 0, label: 'No Tip' },
    { percentage: 15, label: '15%' },
    { percentage: 18, label: '18%' },
    { percentage: 20, label: '20%' },
    { custom: true, label: 'Custom' }
  ];

  const calculateTipAmount = (option) => {
    if (option.amount !== undefined) return option.amount;
    if (option.percentage) return (subtotal * option.percentage) / 100;
    return 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <SafeIcon icon={FiHeart} className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-playfair font-semibold text-gray-900">
          Add Tip (Optional)
        </h3>
      </div>
      
      <p className="text-sm text-gray-600 font-opensans">
        Show your appreciation for our service
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {tipOptions.map((option, index) => {
          const tipAmount = calculateTipAmount(option);
          const isSelected = tip === tipAmount;
          
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTip(tipAmount)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-burgundy-700 bg-burgundy-50 text-burgundy-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="text-center">
                <div className="font-opensans font-semibold">
                  {option.label}
                </div>
                {tipAmount > 0 && (
                  <div className="text-sm text-gray-500 mt-1">
                    ${tipAmount.toFixed(2)}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Custom tip input */}
      <div className="mt-4">
        <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
          Custom Tip Amount
        </label>
        <div className="relative max-w-32">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            min="0"
            step="0.50"
            placeholder="0.00"
            value={tip > 0 && !tipOptions.slice(0, -1).some(opt => calculateTipAmount(opt) === tip) ? tip : ''}
            onChange={(e) => setTip(parseFloat(e.target.value) || 0)}
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
          />
        </div>
      </div>
    </div>
  );
};

export default TipSelector;