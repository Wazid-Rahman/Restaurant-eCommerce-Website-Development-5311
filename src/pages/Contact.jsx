import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck } = FiIcons;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-opensans text-beige-100"
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 font-opensans leading-relaxed">
                Whether you have questions about our menu, want to make a reservation, 
                or need catering services, we're here to help. Reach out to us through 
                any of the methods below.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-burgundy-100 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiMapPin} className="w-6 h-6 text-burgundy-700" />
                </div>
                <div>
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-1">
                    Address
                  </h3>
                  <p className="text-gray-600 font-opensans">
                    123 Italian Street<br />
                    Food City, FC 12345<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-burgundy-100 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiPhone} className="w-6 h-6 text-burgundy-700" />
                </div>
                <div>
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-600 font-opensans">
                    Main: +1 (555) 123-4567<br />
                    Reservations: +1 (555) 123-4568
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-burgundy-100 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiMail} className="w-6 h-6 text-burgundy-700" />
                </div>
                <div>
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-1">
                    Email
                  </h3>
                  <p className="text-gray-600 font-opensans">
                    info@delizio.com<br />
                    reservations@delizio.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-burgundy-100 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiClock} className="w-6 h-6 text-burgundy-700" />
                </div>
                <div>
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-1">
                    Hours
                  </h3>
                  <div className="text-gray-600 font-opensans space-y-1">
                    <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
                    <p>Friday - Saturday: 11:00 AM - 11:00 PM</p>
                    <p>Sunday: 12:00 PM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <SafeIcon icon={FiMapPin} className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-opensans">Interactive Map</p>
                <p className="text-sm text-gray-400 font-opensans">Google Maps integration would go here</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <SafeIcon icon={FiCheck} className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 font-opensans">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                    required
                  />

                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-burgundy-700 text-white py-3 rounded-md hover:bg-burgundy-600 transition-colors font-opensans font-semibold flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiSend} className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-8 bg-beige-50 rounded-lg p-6">
              <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                Other Ways to Connect
              </h3>
              <div className="space-y-3 font-opensans text-gray-700">
                <p>
                  <strong>Catering Inquiries:</strong> catering@delizio.com
                </p>
                <p>
                  <strong>Private Events:</strong> events@delizio.com
                </p>
                <p>
                  <strong>Press & Media:</strong> press@delizio.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;