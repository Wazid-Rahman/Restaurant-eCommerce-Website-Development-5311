import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiShoppingBag, FiTrendingUp, FiDollarSign, FiCalendar, FiEye, FiEdit } = FiIcons;

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for demo
  const stats = {
    totalRevenue: 45280,
    totalOrders: 324,
    totalCustomers: 156,
    averageOrder: 139.75
  };

  const recentOrders = [
    { id: '001234', customer: 'John Doe', total: 45.99, status: 'preparing', time: '10 min ago' },
    { id: '001235', customer: 'Jane Smith', total: 32.50, status: 'delivered', time: '25 min ago' },
    { id: '001236', customer: 'Mike Johnson', total: 67.25, status: 'confirmed', time: '35 min ago' },
    { id: '001237', customer: 'Sarah Wilson', total: 28.75, status: 'out', time: '45 min ago' }
  ];

  const topItems = [
    { name: 'Spaghetti Carbonara', orders: 45, revenue: 1034.55 },
    { name: 'Margherita Pizza', orders: 38, revenue: 759.62 },
    { name: 'Tiramisu', orders: 32, revenue: 287.68 },
    { name: 'Bruschetta Classica', orders: 28, revenue: 363.72 }
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'text-blue-600 bg-blue-50',
      preparing: 'text-yellow-600 bg-yellow-50',
      ready: 'text-purple-600 bg-purple-50',
      out: 'text-orange-600 bg-orange-50',
      delivered: 'text-green-600 bg-green-50'
    };
    return colors[status] || 'text-gray-600 bg-gray-50';
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: FiDollarSign, color: 'text-green-600' },
          { title: 'Total Orders', value: stats.totalOrders, icon: FiShoppingBag, color: 'text-blue-600' },
          { title: 'Total Customers', value: stats.totalCustomers, icon: FiUsers, color: 'text-purple-600' },
          { title: 'Average Order', value: `$${stats.averageOrder}`, icon: FiTrendingUp, color: 'text-orange-600' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-opensans text-gray-600">{stat.title}</p>
                <p className="text-2xl font-playfair font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Top Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
            Recent Orders
          </h3>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-opensans font-medium text-gray-900">#{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-opensans ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm font-opensans text-gray-600">{order.customer}</p>
                  <p className="text-xs font-opensans text-gray-500">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-opensans font-semibold text-gray-900">${order.total}</p>
                  <button className="text-burgundy-700 hover:text-burgundy-600 text-sm font-opensans">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
            Top Selling Items
          </h3>
          <div className="space-y-4">
            {topItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-opensans font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm font-opensans text-gray-600">{item.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="font-opensans font-semibold text-gray-900">${item.revenue}</p>
                  <p className="text-sm font-opensans text-gray-600">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-playfair font-semibold text-gray-900">
          All Orders
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-opensans font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-opensans font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-opensans font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-opensans font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-opensans font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-opensans font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 font-opensans text-sm text-gray-900">#{order.id}</td>
                <td className="px-6 py-4 font-opensans text-sm text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 font-opensans text-sm text-gray-900">${order.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-opensans ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-opensans text-sm text-gray-500">{order.time}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-burgundy-700 hover:text-burgundy-600">
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: FiTrendingUp },
    { id: 'orders', name: 'Orders', icon: FiShoppingBag },
    { id: 'menu', name: 'Menu', icon: FiEdit },
    { id: 'customers', name: 'Customers', icon: FiUsers }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-burgundy-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-playfair font-bold">
            Restaurant Admin
          </h1>
          <p className="text-beige-100 font-opensans mt-2">
            Manage your restaurant operations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 bg-white rounded-lg shadow-sm p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-opensans font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-burgundy-700 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'menu' && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                Menu Management
              </h3>
              <p className="text-gray-600 font-opensans">
                Menu management features would be implemented here.
              </p>
            </div>
          )}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                Customer Management
              </h3>
              <p className="text-gray-600 font-opensans">
                Customer management features would be implemented here.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;