/**
 * Product Data Initialization Script
 * 
 * This script populates the database with sample Nature Care products.
 * 
 * Usage:
 * 1. Update MongoDB connection string if needed
 * 2. Run: node backend/scripts/initializeProducts.js
 * 3. Check database for products
 */

require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const Product = require('../models/Product');

const SAMPLE_PRODUCTS = [
  {
    name: 'Organic Green Tea',
    description: 'Premium organic green tea leaves harvested from sustainable farms. Rich in antioxidants and perfect for daily wellness.',
    price: 12.99,
    category: 'herbs',
    stock: 150,
    rating: 4.5,
    sku: 'OGT-001',
    tags: ['organic', 'tea', 'health'],
    featured: true,
    image: '🍃'
  },
  {
    name: 'Herb Garden Seeds Kit',
    description: 'Complete kit with 12 varieties of herb seeds including basil, thyme, oregano, and more. Perfect for home gardening.',
    price: 24.99,
    category: 'seeds',
    stock: 75,
    rating: 4.8,
    sku: 'HGS-001',
    tags: ['seeds', 'garden', 'herbs'],
    featured: true,
    image: '🌱'
  },
  {
    name: 'Eco-Friendly Hand Tool Set',
    description: 'Sustainable gardening tools made from recycled materials. Includes trowel, fork, and pruner for complete garden care.',
    price: 34.99,
    category: 'tools',
    stock: 50,
    rating: 4.3,
    sku: 'EFT-001',
    tags: ['tools', 'garden', 'eco-friendly'],
    featured: true,
    image: '🛠️'
  },
  {
    name: 'Organic Turmeric Powder',
    description: 'Pure organic turmeric with high curcumin content. Perfect for cooking and wellness supplements.',
    price: 18.99,
    category: 'supplements',
    stock: 200,
    rating: 4.6,
    sku: 'OTP-001',
    tags: ['organic', 'spice', 'health'],
    featured: false,
    image: '🟡'
  },
  {
    name: 'Bamboo Cutting Board',
    description: 'Sustainable bamboo cutting board for kitchen use. Naturally antimicrobial and eco-friendly.',
    price: 22.99,
    category: 'tools',
    stock: 100,
    rating: 4.4,
    sku: 'BCB-001',
    tags: ['bamboo', 'kitchen', 'eco-friendly'],
    featured: false,
    image: '🪵'
  },
  {
    name: 'Lavender Essential Oil',
    description: 'Pure therapeutic grade lavender oil. Perfect for aromatherapy, relaxation, and skincare.',
    price: 29.99,
    category: 'organic',
    stock: 80,
    rating: 4.7,
    sku: 'LEO-001',
    tags: ['essential-oil', 'aromatherapy', 'wellness'],
    featured: true,
    image: '💜'
  },
  {
    name: 'Basil Seeds Pack',
    description: 'Fresh basil seeds for kitchen gardening. Quick growing and perfect for homemade pesto.',
    price: 8.99,
    category: 'seeds',
    stock: 250,
    rating: 4.2,
    sku: 'BSP-001',
    tags: ['seeds', 'basil', 'cooking'],
    featured: false,
    image: '🌿'
  },
  {
    name: 'Natural Bamboo Charcoal',
    description: 'Air purifying bamboo charcoal for home. Removes odors and toxins naturally.',
    price: 15.99,
    category: 'organic',
    stock: 120,
    rating: 4.5,
    sku: 'NBC-001',
    tags: ['charcoal', 'air-purifier', 'eco-friendly'],
    featured: false,
    image: '⚫'
  },
  {
    name: 'Organic Ginger Root',
    description: 'Fresh organic ginger root. Great for cooking, tea, and wellness purposes.',
    price: 11.99,
    category: 'organic',
    stock: 180,
    rating: 4.6,
    sku: 'OGR-001',
    tags: ['organic', 'spice', 'fresh'],
    featured: false,
    image: '🏵️'
  },
  {
    name: 'Sustainable Garden Planter',
    description: 'Eco-friendly terracotta planter. Perfect for indoor and outdoor gardening.',
    price: 19.99,
    category: 'tools',
    stock: 110,
    rating: 4.4,
    sku: 'SGP-001',
    tags: ['planter', 'garden', 'terracotta'],
    featured: false,
    image: '🪴'
  },
  {
    name: 'Chamomile Tea Set',
    description: 'Premium chamomile tea with calming properties. Perfect for evening relaxation.',
    price: 16.99,
    category: 'herbs',
    stock: 130,
    rating: 4.5,
    sku: 'CTS-001',
    tags: ['tea', 'chamomile', 'relaxation'],
    featured: false,
    image: '🫖'
  },
  {
    name: 'Organic Honey',
    description: 'Pure organic honey from sustainable beekeeping. Raw and unprocessed.',
    price: 21.99,
    category: 'organic',
    stock: 90,
    rating: 4.7,
    sku: 'OHN-001',
    tags: ['honey', 'organic', 'natural'],
    featured: true,
    image: '🍯'
  }
];

async function initializeProducts() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nature-care';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(SAMPLE_PRODUCTS);
    console.log(`✓ Inserted ${insertedProducts.length} products`);

    // Display inserted products
    console.log('\n✓ Products initialized successfully:');
    insertedProducts.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.name} - $${product.price}`);
    });

    console.log('\n✓ Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error initializing database:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  initializeProducts();
}

module.exports = { SAMPLE_PRODUCTS, initializeProducts };
