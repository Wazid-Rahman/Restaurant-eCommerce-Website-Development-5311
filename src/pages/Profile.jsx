import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX, FiAward, FiShoppingBag } = FiIcons;

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zipCode || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      zipCode: user?.zipCode || ''
    });
    setIsEditing(false);
  };

  const recentOrders = user?.orders?.slice(-3) || [];
  const totalOrders = user?.orders?.length || 0;
  const totalSpent = user?.orders?.reduce((total, order) => total + order.total, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-burgundy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              My Profile
            </h1>
            <p className="text-xl font-opensans text-beige-100">
              Manage your account and preferences
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair font-bold text-gray-900">
                  Personal Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 text-burgundy-700 hover:text-burgundy-600 transition-colors"
                  >
                    <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                    <span className="font-opensans">Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-1 bg-burgundy-700 text-white px-3 py-1 rounded-md hover:bg-burgundy-600 transition-colors"
                    >
                      <SafeIcon icon={FiSave} className="w-4 h-4" />
                      <span className="font-opensans">Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      <SafeIcon icon={FiX} className="w-4 h-4" />
                      <span className="font-opensans">Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 py-3">
                        <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-400" />
                        <span className="font-opensans text-gray-900">{user?.firstName}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 py-3">
                        <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-400" />
                        <span className="font-opensans text-gray-900">{user?.lastName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 py-3">
                      <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-400" />
                      <span className="font-opensans text-gray-900">{user?.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 py-3">
                      <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-400" />
                      <span className="font-opensans text-gray-900">{user?.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                        />
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 py-3">
                      <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-400" />
                      <span className="font-opensans text-gray-900">
                        {user?.address ? 
                          `${user.address}, ${user.city} ${user.zipCode}` : 
                          'Not provided'
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Account Stats */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                Account Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-burgundy-700" />
                    <span className="font-opensans text-gray-700">Total Orders</span>
                  </div>
                  <span className="font-opensans font-semibold text-gray-900">{totalOrders}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiAward} className="w-5 h-5 text-burgundy-700" />
                    <span className="font-opensans text-gray-700">Loyalty Points</span>
                  </div>
                  <span className="font-opensans font-semibold text-gray-900">{user?.loyaltyPoints || 0}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 text-center text-burgundy-700 font-bold">$</span>
                    <span className="font-opensans text-gray-700">Total Spent</span>
                  </div>
                  <span className="font-opensans font-semibold text-gray-900">${totalSpent.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                Recent Orders
              </h3>
              
              {recentOrders.length > 0 ? (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-opensans font-medium text-gray-900">
                            Order #{order.id.toString().slice(-6)}
                          </p>
                          <p className="text-sm font-opensans text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="font-opensans font-semibold text-burgundy-700">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 font-opensans text-center py-4">
                  No orders yet
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;