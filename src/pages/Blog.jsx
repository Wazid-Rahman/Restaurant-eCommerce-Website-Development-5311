import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiUser, FiArrowRight, FiSearch } = FiIcons;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Making Perfect Pasta",
      excerpt: "Discover the secrets behind creating al dente pasta every time, from selecting the right flour to timing the cooking process.",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=250&fit=crop",
      category: "cooking-tips",
      author: "Giuseppe Rossi",
      date: "2024-01-15",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Seasonal Ingredients: Winter Italian Favorites",
      excerpt: "Explore how seasonal ingredients transform Italian cuisine during winter months, featuring hearty dishes and warming flavors.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop",
      category: "ingredients",
      author: "Maria Benedetti",
      date: "2024-01-10",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Wine Pairing Guide for Italian Cuisine",
      excerpt: "Learn how to pair Italian wines with different dishes to enhance your dining experience and bring out the best flavors.",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=250&fit=crop",
      category: "wine",
      author: "Giuseppe Rossi",
      date: "2024-01-05",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "The History of Tiramisu",
      excerpt: "Dive into the fascinating history of Italy's most beloved dessert and learn about the traditional preparation methods.",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=250&fit=crop",
      category: "history",
      author: "Antonio Lombardi",
      date: "2024-01-01",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "Regional Italian Cuisines: A Journey Through Italy",
      excerpt: "Explore the diverse culinary traditions across different regions of Italy, from Sicily to Piedmont.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
      category: "culture",
      author: "Maria Benedetti",
      date: "2023-12-28",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Homemade Gelato: Tips from Our Pastry Chef",
      excerpt: "Antonio shares his professional secrets for making creamy, authentic Italian gelato at home.",
      image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=250&fit=crop",
      category: "desserts",
      author: "Antonio Lombardi",
      date: "2023-12-25",
      readTime: "6 min read"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'cooking-tips', name: 'Cooking Tips' },
    { id: 'ingredients', name: 'Ingredients' },
    { id: 'wine', name: 'Wine & Drinks' },
    { id: 'history', name: 'History' },
    { id: 'culture', name: 'Culture' },
    { id: 'desserts', name: 'Desserts' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            Delizio Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-opensans text-beige-100"
          >
            Culinary insights, tips, and stories from our kitchen
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-opensans font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-burgundy-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img 
                  src={filteredPosts[0].image} 
                  alt={filteredPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 font-opensans mb-3">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiUser} className="w-4 h-4" />
                      <span>{filteredPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                      <span>{new Date(filteredPosts[0].date).toLocaleDateString()}</span>
                    </div>
                    <span>{filteredPosts[0].readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-3">
                    {filteredPosts[0].title}
                  </h2>
                  
                  <p className="text-gray-600 font-opensans mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  
                  <button className="text-burgundy-700 hover:text-burgundy-600 font-opensans font-medium flex items-center space-x-2">
                    <span>Read More</span>
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 font-opensans mb-3">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 font-opensans text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-opensans">
                    {post.readTime}
                  </span>
                  <button className="text-burgundy-700 hover:text-burgundy-600 font-opensans font-medium flex items-center space-x-1">
                    <span>Read</span>
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-opensans text-lg">
              No articles found matching your criteria.
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-burgundy-700 text-white rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-playfair font-bold mb-4">
            Stay Updated
          </h3>
          <p className="text-beige-100 font-opensans mb-6">
            Subscribe to our newsletter for the latest recipes, tips, and culinary stories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-beige-300 font-opensans"
            />
            <button className="bg-beige-600 text-white px-6 py-3 rounded-md hover:bg-beige-500 transition-colors font-opensans font-semibold">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;