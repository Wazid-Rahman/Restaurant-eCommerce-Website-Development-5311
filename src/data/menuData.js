export const menuCategories = [
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'mains', name: 'Main Course', icon: '🍝' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'vegan', name: 'Vegan Options', icon: '🌱' }
];

export const menuItems = [
  // Starters
  {
    id: 1,
    name: 'Bruschetta Classica',
    category: 'starters',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
    description: 'Fresh tomatoes, basil, garlic, and mozzarella on toasted bread',
    ingredients: ['Fresh tomatoes', 'Basil', 'Garlic', 'Mozzarella', 'Olive oil'],
    nutritionalInfo: { calories: 180, protein: 8, carbs: 20, fat: 9 },
    options: {
      size: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 3 }
      ]
    },
    isVegan: false,
    isPopular: true
  },
  {
    id: 2,
    name: 'Antipasto Platter',
    category: 'starters',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    description: 'Selection of Italian cured meats, cheeses, and marinated vegetables',
    ingredients: ['Prosciutto', 'Salami', 'Mozzarella', 'Olives', 'Roasted peppers'],
    nutritionalInfo: { calories: 320, protein: 18, carbs: 12, fat: 24 },
    options: {
      size: [
        { name: 'For 2', price: 0 },
        { name: 'For 4', price: 12 }
      ]
    },
    isVegan: false,
    isPopular: false
  },
  {
    id: 3,
    name: 'Caprese Salad',
    category: 'starters',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop',
    description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
    ingredients: ['Fresh mozzarella', 'Tomatoes', 'Basil', 'Balsamic glaze', 'Olive oil'],
    nutritionalInfo: { calories: 220, protein: 12, carbs: 8, fat: 16 },
    options: {
      extras: [
        { name: 'Extra Mozzarella', price: 3 },
        { name: 'Avocado', price: 2 }
      ]
    },
    isVegan: false,
    isPopular: true
  },
  {
    id: 4,
    name: 'Arancini',
    category: 'starters',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
    description: 'Crispy risotto balls stuffed with mozzarella and served with marinara',
    ingredients: ['Risotto', 'Mozzarella', 'Breadcrumbs', 'Marinara sauce'],
    nutritionalInfo: { calories: 280, protein: 12, carbs: 32, fat: 12 },
    options: {
      filling: [
        { name: 'Mozzarella', price: 0 },
        { name: 'Mushroom', price: 1 },
        { name: 'Spinach', price: 1 }
      ]
    },
    isVegan: false,
    isPopular: false
  },

  // Main Course
  {
    id: 5,
    name: 'Spaghetti Carbonara',
    category: 'mains',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    description: 'Classic Roman pasta with eggs, pecorino cheese, pancetta, and black pepper',
    ingredients: ['Spaghetti', 'Eggs', 'Pecorino cheese', 'Pancetta', 'Black pepper'],
    nutritionalInfo: { calories: 650, protein: 28, carbs: 65, fat: 32 },
    options: {
      size: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 5 }
      ],
      extras: [
        { name: 'Extra Pancetta', price: 4 },
        { name: 'Extra Cheese', price: 2 }
      ]
    },
    isVegan: false,
    isPopular: true
  },
  {
    id: 6,
    name: 'Margherita Pizza',
    category: 'mains',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    description: 'Traditional pizza with tomato sauce, mozzarella, and fresh basil',
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Fresh basil', 'Olive oil'],
    nutritionalInfo: { calories: 580, protein: 24, carbs: 70, fat: 22 },
    options: {
      size: [
        { name: '12 inch', price: 0 },
        { name: '16 inch', price: 6 }
      ],
      crust: [
        { name: 'Thin', price: 0 },
        { name: 'Thick', price: 2 }
      ]
    },
    isVegan: false,
    isPopular: true
  },
  {
    id: 7,
    name: 'Osso Buco',
    category: 'mains',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Braised veal shanks with vegetables, white wine, and broth',
    ingredients: ['Veal shanks', 'Carrots', 'Celery', 'Onions', 'White wine', 'Broth'],
    nutritionalInfo: { calories: 720, protein: 45, carbs: 15, fat: 48 },
    options: {
      side: [
        { name: 'Risotto', price: 0 },
        { name: 'Polenta', price: 0 },
        { name: 'Pasta', price: 2 }
      ]
    },
    isVegan: false,
    isPopular: false
  },
  {
    id: 8,
    name: 'Chicken Parmigiana',
    category: 'mains',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop',
    description: 'Breaded chicken breast with marinara sauce and melted mozzarella',
    ingredients: ['Chicken breast', 'Breadcrumbs', 'Marinara sauce', 'Mozzarella', 'Parmesan'],
    nutritionalInfo: { calories: 620, protein: 42, carbs: 35, fat: 32 },
    options: {
      side: [
        { name: 'Spaghetti', price: 0 },
        { name: 'Vegetables', price: 0 },
        { name: 'Salad', price: 2 }
      ]
    },
    isVegan: false,
    isPopular: true
  },
  {
    id: 9,
    name: 'Seafood Risotto',
    category: 'mains',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
    description: 'Creamy risotto with mixed seafood, saffron, and white wine',
    ingredients: ['Arborio rice', 'Shrimp', 'Mussels', 'Calamari', 'Saffron', 'White wine'],
    nutritionalInfo: { calories: 580, protein: 35, carbs: 55, fat: 22 },
    options: {
      spice: [
        { name: 'Mild', price: 0 },
        { name: 'Medium', price: 0 },
        { name: 'Spicy', price: 0 }
      ]
    },
    isVegan: false,
    isPopular: false
  },

  // Desserts
  {
    id: 10,
    name: 'Tiramisu',
    category: 'desserts',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    ingredients: ['Ladyfingers', 'Mascarpone', 'Coffee', 'Cocoa powder', 'Eggs'],
    nutritionalInfo: { calories: 420, protein: 8, carbs: 45, fat: 22 },
    options: {
      size: [
        { name: 'Individual', price: 0 },
        { name: 'Large', price: 4 }
      ]
    },
    isVegan: false,
    isPopular: true
  },
  {
    id: 11,
    name: 'Panna Cotta',
    category: 'desserts',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    description: 'Silky smooth vanilla custard with berry compote',
    ingredients: ['Cream', 'Sugar', 'Vanilla', 'Gelatin', 'Berry compote'],
    nutritionalInfo: { calories: 320, protein: 6, carbs: 35, fat: 18 },
    options: {
      flavor: [
        { name: 'Vanilla', price: 0 },
        { name: 'Chocolate', price: 1 },
        { name: 'Strawberry', price: 1 }
      ]
    },
    isVegan: false,
    isPopular: false
  },
  {
    id: 12,
    name: 'Cannoli',
    category: 'desserts',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    description: 'Crispy pastry shells filled with sweet ricotta cream',
    ingredients: ['Pastry shells', 'Ricotta cheese', 'Powdered sugar', 'Chocolate chips'],
    nutritionalInfo: { calories: 380, protein: 12, carbs: 42, fat: 18 },
    options: {
      quantity: [
        { name: '2 pieces', price: 0 },
        { name: '4 pieces', price: 4 }
      ]
    },
    isVegan: false,
    isPopular: true
  },
  {
    id: 13,
    name: 'Gelato',
    category: 'desserts',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop',
    description: 'Authentic Italian gelato in various flavors',
    ingredients: ['Milk', 'Sugar', 'Natural flavors'],
    nutritionalInfo: { calories: 180, protein: 4, carbs: 28, fat: 6 },
    options: {
      flavor: [
        { name: 'Vanilla', price: 0 },
        { name: 'Chocolate', price: 0 },
        { name: 'Strawberry', price: 0 },
        { name: 'Pistachio', price: 1 }
      ],
      size: [
        { name: 'Single Scoop', price: 0 },
        { name: 'Double Scoop', price: 3 }
      ]
    },
    isVegan: false,
    isPopular: true
  },

  // Beverages
  {
    id: 14,
    name: 'Espresso',
    category: 'beverages',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
    description: 'Strong Italian coffee served in a small cup',
    ingredients: ['Espresso beans'],
    nutritionalInfo: { calories: 5, protein: 0, carbs: 1, fat: 0 },
    options: {
      size: [
        { name: 'Single', price: 0 },
        { name: 'Double', price: 2 }
      ]
    },
    isVegan: true,
    isPopular: true
  },
  {
    id: 15,
    name: 'Cappuccino',
    category: 'beverages',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
    description: 'Espresso with steamed milk and foam',
    ingredients: ['Espresso', 'Steamed milk', 'Milk foam'],
    nutritionalInfo: { calories: 120, protein: 6, carbs: 12, fat: 4 },
    options: {
      size: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 1.5 }
      ],
      milk: [
        { name: 'Whole', price: 0 },
        { name: 'Skim', price: 0 },
        { name: 'Oat', price: 0.5 },
        { name: 'Almond', price: 0.5 }
      ]
    },
    isVegan: false,
    isPopular: true
  },
  {
    id: 16,
    name: 'Italian Soda',
    category: 'beverages',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
    description: 'Refreshing sparkling water with Italian syrup',
    ingredients: ['Sparkling water', 'Italian syrup'],
    nutritionalInfo: { calories: 80, protein: 0, carbs: 20, fat: 0 },
    options: {
      flavor: [
        { name: 'Lemon', price: 0 },
        { name: 'Orange', price: 0 },
        { name: 'Cherry', price: 0 },
        { name: 'Vanilla', price: 0 }
      ]
    },
    isVegan: true,
    isPopular: false
  },
  {
    id: 17,
    name: 'House Wine',
    category: 'beverages',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop',
    description: 'Our selection of Italian wines by the glass',
    ingredients: ['Italian wine'],
    nutritionalInfo: { calories: 125, protein: 0, carbs: 4, fat: 0 },
    options: {
      type: [
        { name: 'Red', price: 0 },
        { name: 'White', price: 0 },
        { name: 'Rosé', price: 0 }
      ]
    },
    isVegan: true,
    isPopular: false
  },

  // Vegan Options
  {
    id: 18,
    name: 'Vegan Margherita',
    category: 'vegan',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    description: 'Pizza with vegan cheese, tomato sauce, and fresh basil',
    ingredients: ['Pizza dough', 'Tomato sauce', 'Vegan cheese', 'Fresh basil'],
    nutritionalInfo: { calories: 520, protein: 18, carbs: 68, fat: 18 },
    options: {
      size: [
        { name: '12 inch', price: 0 },
        { name: '16 inch', price: 6 }
      ]
    },
    isVegan: true,
    isPopular: true
  },
  {
    id: 19,
    name: 'Pasta Arrabbiata',
    category: 'vegan',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    description: 'Spicy tomato sauce with garlic, chili, and herbs',
    ingredients: ['Pasta', 'Tomatoes', 'Garlic', 'Chili', 'Herbs', 'Olive oil'],
    nutritionalInfo: { calories: 420, protein: 12, carbs: 78, fat: 8 },
    options: {
      spice: [
        { name: 'Mild', price: 0 },
        { name: 'Medium', price: 0 },
        { name: 'Hot', price: 0 }
      ]
    },
    isVegan: true,
    isPopular: false
  },
  {
    id: 20,
    name: 'Vegan Tiramisu',
    category: 'vegan',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    description: 'Plant-based version of the classic Italian dessert',
    ingredients: ['Vegan ladyfingers', 'Cashew cream', 'Coffee', 'Cocoa powder'],
    nutritionalInfo: { calories: 380, protein: 8, carbs: 42, fat: 18 },
    options: {
      size: [
        { name: 'Individual', price: 0 },
        { name: 'Large', price: 4 }
      ]
    },
    isVegan: true,
    isPopular: true
  }
];

export const coupons = [
  {
    code: 'WELCOME10',
    discount: 10,
    description: '10% off your first order',
    minOrder: 25,
    maxDiscount: 10
  },
  {
    code: 'SAVE15',
    discount: 15,
    description: '15% off orders over $50',
    minOrder: 50,
    maxDiscount: 15
  },
  {
    code: 'DELIZIO20',
    discount: 20,
    description: '20% off orders over $75',
    minOrder: 75,
    maxDiscount: 25
  }
];