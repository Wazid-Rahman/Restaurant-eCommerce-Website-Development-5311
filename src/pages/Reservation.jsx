import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiClock, FiUsers, FiCheck, FiPhone, FiMail } = FiIcons;

const Reservation = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.firstName + ' ' + user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate reservation submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
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
            Make a Reservation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-opensans text-beige-100"
          >
            Book your table for an unforgettable dining experience
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                Reserve Your Table
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <SafeIcon icon={FiCheck} className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                    Reservation Confirmed!
                  </h3>
                  <p className="text-gray-600 font-opensans">
                    We'll send you a confirmation email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                      required
                    />
                  </div>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                    required
                  />

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <SafeIcon icon={FiCalendar} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="relative">
                      <SafeIcon icon={FiClock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans appearance-none"
                        required
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Number of Guests */}
                  <div className="relative">
                    <SafeIcon icon={FiUsers} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={formData.guests}
                      onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Special Requests */}
                  <textarea
                    placeholder="Special requests or dietary requirements (optional)"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                  />

                  <button
                    type="submit"
                    className="w-full bg-burgundy-700 text-white py-3 rounded-md hover:bg-burgundy-600 transition-colors font-opensans font-semibold"
                  >
                    Reserve Table
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Restaurant Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiPhone} className="w-5 h-5 text-burgundy-700" />
                  <span className="font-opensans text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMail} className="w-5 h-5 text-burgundy-700" />
                  <span className="font-opensans text-gray-700">reservations@delizio.com</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-6">
                Opening Hours
              </h3>
              
              <div className="space-y-2 font-opensans">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Thursday</span>
                  <span className="text-gray-900 font-medium">11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Friday - Saturday</span>
                  <span className="text-gray-900 font-medium">11:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sunday</span>
                  <span className="text-gray-900 font-medium">12:00 PM - 9:00 PM</span>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-6">
                Reservation Policies
              </h3>
              
              <ul className="space-y-3 font-opensans text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-burgundy-700 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Reservations can be made up to 30 days in advance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-burgundy-700 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Please arrive within 15 minutes of your reservation time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-burgundy-700 rounded-full mt-2 flex-shrink-0"></span>
                  <span>For parties of 6 or more, please call directly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-burgundy-700 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Cancellations must be made at least 2 hours in advance</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;