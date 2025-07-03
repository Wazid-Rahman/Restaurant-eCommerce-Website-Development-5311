import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShoppingCart, FiCreditCard, FiCheck } = FiIcons;

const CheckoutProgress = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, name: 'Order Type', icon: FiShoppingCart },
    { id: 2, name: 'Payment', icon: FiCreditCard },
    { id: 3, name: 'Review', icon: FiCheck }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: currentStep >= step.id ? 1 : 0.8,
                backgroundColor: currentStep >= step.id ? '#9a2f2f' : '#e5e7eb'
              }}
              transition={{ duration: 0.3 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-opensans font-semibold ${
                currentStep >= step.id ? 'bg-burgundy-700 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              <SafeIcon icon={step.icon} className="w-5 h-5" />
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                initial={{ width: '0%' }}
                animate={{ 
                  width: '100%',
                  backgroundColor: currentStep > step.id ? '#9a2f2f' : '#e5e7eb'
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`flex-1 h-1 mx-4 ${
                  currentStep > step.id ? 'bg-burgundy-700' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3">
        {steps.map((step) => (
          <span
            key={step.id}
            className={`text-sm font-opensans ${
              currentStep >= step.id ? 'text-burgundy-700 font-medium' : 'text-gray-500'
            }`}
          >
            {step.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;