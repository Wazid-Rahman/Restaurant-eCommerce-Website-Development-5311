import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiCheck, FiTruck, FiHome, FiShoppingBag, FiMapPin } = FiIcons;

const OrderTracking = () => {
  const location = useLocation();
  const { user } = useAuth();
  const newOrder = location.state?.newOrder;

  const orders = user?.orders || [];
  const displayOrder = newOrder || orders[orders.length - 1];

  const getStatusSteps = (orderType) => {
    if (orderType === 'delivery') {
      return [
        { id: 'confirmed', label: 'Order Confirmed', icon: FiCheck },
        { id: 'preparing', label: 'Preparing', icon: FiClock },
        { id: 'ready', label: 'Ready for Delivery', icon: FiShoppingBag },
        { id: 'out', label: 'Out for Delivery', icon: FiTruck },
        { id: 'delivered', label: 'Delivered', icon: FiHome }
      ];
    } else {
      return [
        { id: 'confirmed', label: 'Order Confirmed', icon: FiCheck },
        { id: 'preparing', label: 'Preparing', icon: FiClock },
        { id: 'ready', label: 'Ready for Pickup', icon: FiShoppingBag },
        { id: 'completed', label: 'Completed', icon: FiCheck }
      ];
    }
  };

  const getCurrentStepIndex = (status, orderType) => {
    const steps = getStatusSteps(orderType);
    const statusMap = {
      'confirmed': 0,
      'preparing': 1,
      'ready': 2,
      'out': 3,
      'delivered': 4,
      'completed': 3
    };
    return statusMap[status] || 0;
  };

  if (!displayOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <SafeIcon icon={FiShoppingBag} className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
            No Orders Found
          </h2>
          <p className="text-gray-600 font-opensans">
            You haven't placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  const steps = getStatusSteps(displayOrder.orderType);
  const currentStep = getCurrentStepIndex(displayOrder.status, displayOrder.orderType);

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
            Order Tracking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-opensans text-beige-100"
          >
            Track your order status in real-time
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                Order #{displayOrder.id.toString().slice(-6)}
              </h2>
              
              <div className="space-y-3 font-opensans">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="text-gray-900">
                    {new Date(displayOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Type:</span>
                  <span className="text-gray-900 capitalize">{displayOrder.orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Time:</span>
                  <span className="text-gray-900">{displayOrder.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="text-gray-900 font-semibold">${displayOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {displayOrder.deliveryInfo && (
              <div>
                <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                  Delivery Address
                </h3>
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5 text-burgundy-700 mt-1" />
                  <div className="font-opensans text-gray-700">
                    <p>{displayOrder.deliveryInfo.address}</p>
                    <p>{displayOrder.deliveryInfo.city}, {displayOrder.deliveryInfo.zipCode}</p>
                    <p className="mt-2">Phone: {displayOrder.deliveryInfo.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h3 className="text-xl font-playfair font-bold text-gray-900 mb-8">
            Order Status
          </h3>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-8 h-full w-0.5 bg-gray-200"></div>
            <div 
              className="absolute left-6 top-8 w-0.5 bg-burgundy-700 transition-all duration-1000"
              style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-center">
                  <div
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                      index <= currentStep
                        ? 'bg-burgundy-700 border-burgundy-700 text-white'
                        : 'bg-white border-gray-200 text-gray-400'
                    }`}
                  >
                    <SafeIcon icon={step.icon} className="w-5 h-5" />
                  </div>
                  <div className="ml-6">
                    <h4 className={`font-playfair font-semibold ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </h4>
                    {index === currentStep && (
                      <p className="text-sm font-opensans text-burgundy-700 mt-1">
                        Current Status
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h3 className="text-xl font-playfair font-bold text-gray-900 mb-6">
            Order Items
          </h3>

          <div className="space-y-4">
            {displayOrder.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-playfair font-semibold text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-sm font-opensans text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  {item.options && Object.entries(item.options).length > 0 && (
                    <div className="text-sm font-opensans text-gray-500">
                      {Object.entries(item.options).map(([key, value]) => (
                        <span key={key} className="mr-2">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-opensans font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 font-opensans mb-4">
            Need help with your order?
          </p>
          <div className="space-x-4">
            <button className="bg-burgundy-700 text-white px-6 py-2 rounded-md hover:bg-burgundy-600 transition-colors font-opensans">
              Contact Support
            </button>
            <button className="border border-burgundy-700 text-burgundy-700 px-6 py-2 rounded-md hover:bg-burgundy-50 transition-colors font-opensans">
              Call Restaurant
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTracking;