import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { menuItems } from '../data/menuData';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiStar, FiAward, FiUsers, FiClock } = FiIcons;

const Home = () => {
  const popularItems = menuItems.filter(item => item.isPopular).slice(0, 4);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely amazing! The pasta was perfectly cooked and the service was exceptional.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Best Italian restaurant in town! The tiramisu is to die for.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emma Wilson",
      rating: 5,
      comment: "Perfect atmosphere for a romantic dinner. Highly recommended!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-playfair font-bold mb-6"
          >
            Welcome to Delizio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-opensans mb-8"
          >
            Authentic Italian cuisine crafted with passion and tradition
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/menu"
              className="bg-burgundy-700 text-white px-8 py-4 rounded-lg hover:bg-burgundy-600 transition-colors font-opensans font-semibold flex items-center justify-center space-x-2"
            >
              <span>View Menu</span>
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </Link>
            <Link
              to="/reservation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-opensans font-semibold"
            >
              Book a Table
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
              Why Choose Delizio?
            </h2>
            <p className="text-xl text-gray-600 font-opensans">
              Experience the finest Italian dining with our commitment to quality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiAward,
                title: "Award-Winning Chef",
                description: "Our head chef has won multiple culinary awards for authentic Italian cuisine"
              },
              {
                icon: FiUsers,
                title: "Family Tradition",
                description: "Recipes passed down through generations, bringing authentic flavors to your table"
              },
              {
                icon: FiClock,
                title: "Fresh Daily",
                description: "All ingredients sourced fresh daily to ensure the highest quality in every dish"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-md"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy-100 rounded-full mb-4">
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-burgundy-700" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-opensans">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
              Popular Dishes
            </h2>
            <p className="text-xl text-gray-600 font-opensans">
              Discover our most loved dishes, crafted with authentic Italian flavors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-burgundy-700 text-white px-2 py-1 rounded-full text-sm font-opensans">
                    Popular
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 font-opensans text-sm mb-3">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-burgundy-700">
                      ${item.price}
                    </span>
                    <Link
                      to={`/product/${item.id}`}
                      className="bg-burgundy-700 text-white px-4 py-2 rounded-md hover:bg-burgundy-600 transition-colors font-opensans text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="bg-burgundy-700 text-white px-8 py-3 rounded-lg hover:bg-burgundy-600 transition-colors font-opensans font-semibold inline-flex items-center space-x-2"
            >
              <span>View Full Menu</span>
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 font-opensans">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-playfair font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <SafeIcon key={i} icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 font-opensans italic">
                  "{testimonial.comment}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-burgundy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-playfair font-bold text-white mb-4">
              Ready to Experience Delizio?
            </h2>
            <p className="text-xl text-beige-100 font-opensans mb-8">
              Book your table today or order online for delivery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/reservation"
                className="bg-white text-burgundy-700 px-8 py-4 rounded-lg hover:bg-beige-50 transition-colors font-opensans font-semibold"
              >
                Make Reservation
              </Link>
              <Link
                to="/menu"
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-burgundy-700 transition-colors font-opensans font-semibold"
              >
                Order Online
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;