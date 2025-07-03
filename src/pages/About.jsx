import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAward, FiHeart, FiUsers, FiStar } = FiIcons;

const About = () => {
  const chefs = [
    {
      name: "Giuseppe Rossi",
      title: "Head Chef & Owner",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop&crop=face",
      description: "With over 20 years of experience in authentic Italian cuisine, Giuseppe brings traditional recipes from his hometown in Tuscany."
    },
    {
      name: "Maria Benedetti",
      title: "Sous Chef",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop&crop=face",
      description: "Maria specializes in handmade pasta and desserts, learned from her grandmother's centuries-old family recipes."
    },
    {
      name: "Antonio Lombardi",
      title: "Pastry Chef",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      description: "Antonio creates our signature desserts, combining traditional Italian techniques with modern presentation."
    }
  ];

  const values = [
    {
      icon: FiHeart,
      title: "Passion for Quality",
      description: "Every dish is crafted with love and attention to detail, using only the finest ingredients."
    },
    {
      icon: FiUsers,
      title: "Family Tradition",
      description: "Our recipes have been passed down through generations, preserving authentic Italian flavors."
    },
    {
      icon: FiAward,
      title: "Excellence",
      description: "We strive for perfection in every aspect of your dining experience, from food to service."
    },
    {
      icon: FiStar,
      title: "Innovation",
      description: "While honoring tradition, we continuously innovate to create memorable culinary experiences."
    }
  ];

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
            About Delizio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-opensans text-beige-100"
          >
            Authentic Italian cuisine with a passion for excellence
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 font-opensans text-gray-700 text-lg leading-relaxed">
                <p>
                  Founded in 2010 by Giuseppe Rossi, Delizio began as a dream to bring authentic Italian flavors to our community. Giuseppe, born and raised in the hills of Tuscany, grew up surrounded by the aromas and traditions of Italian cooking.
                </p>
                <p>
                  After moving to America, he noticed a gap in truly authentic Italian dining experiences. Determined to share his heritage, Giuseppe opened Delizio with a simple mission: to serve food that honors Italian tradition while creating new memories for our guests.
                </p>
                <p>
                  Today, Delizio has become a beloved gathering place where families and friends come together to enjoy exceptional food, warm hospitality, and the timeless joy of sharing a meal.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
                alt="Restaurant interior"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 font-opensans">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-md"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy-100 rounded-full mb-4">
                  <SafeIcon icon={value.icon} className="w-8 h-8 text-burgundy-700" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-opensans">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 font-opensans">
              The talented chefs behind your culinary experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img 
                  src={chef.image} 
                  alt={chef.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-1">
                    {chef.name}
                  </h3>
                  <p className="text-burgundy-700 font-opensans font-medium mb-3">
                    {chef.title}
                  </p>
                  <p className="text-gray-600 font-opensans">
                    {chef.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-burgundy-700 text-white rounded-lg p-12 text-center"
          >
            <h2 className="text-3xl font-playfair font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl font-opensans text-beige-100 leading-relaxed max-w-4xl mx-auto">
              "To create an authentic Italian dining experience that brings people together, 
              honoring our culinary heritage while building new traditions. Every guest 
              leaves as part of our extended family."
            </p>
            <div className="mt-8">
              <span className="text-beige-300 font-playfair italic text-lg">
                - Giuseppe Rossi, Owner & Head Chef
              </span>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;