import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import dns from 'dns';
import { User, Admin, Product } from './models/Schema.js';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shop';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Admin.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data.');

    // ==================== SEED ADMIN USER ====================
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      username: 'Admin',
      email: 'admin@shopez.com',
      password: adminPassword,
      usertype: 'admin'
    });
    console.log('Admin user created: admin@shopez.com / admin123');

    // ==================== SEED CUSTOMER USER ====================
    const customerPassword = await bcrypt.hash('customer123', 10);
    await User.create({
      username: 'John Doe',
      email: 'john@example.com',
      password: customerPassword,
      usertype: 'customer'
    });
    console.log('Customer user created: john@example.com / customer123');

    // ==================== SEED CATEGORIES ====================
    const categories = ['Electronics', 'Fashion', 'Mobiles', 'Groceries', 'Sports-Equipment', 'Home & Kitchen', 'Books'];
    await Admin.create({
      banner: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop',
      categories
    });
    console.log('Categories seeded:', categories.join(', '));

    // ==================== SEED PRODUCTS ====================
    const products = [
      // Electronics
      {
        title: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise canceling wireless headphones with Auto NC Optimizer, crystal-clear hands-free calling, and up to 30 hours battery life.',
        mainImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&fit=crop',
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&fit=crop',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&fit=crop'
        ],
        sizes: [],
        category: 'Electronics',
        gender: 'Unisex',
        price: 29990,
        discount: 20,
        stock: 50,
        rating: 4.5,
        numReviews: 234
      },
      {
        title: 'Apple MacBook Air M2',
        description: 'Supercharged by M2 chip. Up to 18 hours battery life. 13.6-inch Liquid Retina display. Fanless design for silent operation.',
        mainImg: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&fit=crop',
          'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&fit=crop',
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&fit=crop'
        ],
        sizes: [],
        category: 'Electronics',
        gender: 'Unisex',
        price: 114900,
        discount: 10,
        stock: 25,
        rating: 4.8,
        numReviews: 567
      },
      {
        title: 'Samsung 55" 4K Smart TV',
        description: 'Crystal UHD 4K resolution with HDR support. Smart TV with built-in streaming apps. Sleek and slim design.',
        mainImg: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&fit=crop',
          'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&fit=crop',
          'https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=800&fit=crop'
        ],
        sizes: [],
        category: 'Electronics',
        gender: 'Unisex',
        price: 54990,
        discount: 25,
        stock: 15,
        rating: 4.3,
        numReviews: 189
      },
      // Fashion
      {
        title: 'Premium Cotton Slim Fit Shirt',
        description: 'Classic slim fit shirt made from 100% premium cotton. Perfect for formal and semi-formal occasions. Wrinkle-resistant fabric.',
        mainImg: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&fit=crop',
          'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=800&fit=crop',
          'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&fit=crop'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Fashion',
        gender: 'Men',
        price: 1999,
        discount: 40,
        stock: 200,
        rating: 4.2,
        numReviews: 456
      },
      {
        title: 'Women Floral Summer Dress',
        description: 'Beautiful floral print summer dress. Lightweight and breathable fabric. Perfect for casual outings and beach days.',
        mainImg: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&fit=crop',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&fit=crop',
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&fit=crop'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Fashion',
        gender: 'Women',
        price: 2499,
        discount: 35,
        stock: 150,
        rating: 4.6,
        numReviews: 312
      },
      {
        title: 'Unisex Denim Jacket',
        description: 'Classic denim jacket with a modern fit. Durable cotton denim with button closure. Versatile style for all seasons.',
        mainImg: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&fit=crop',
          'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&fit=crop',
          'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&fit=crop'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Fashion',
        gender: 'Unisex',
        price: 3499,
        discount: 30,
        stock: 80,
        rating: 4.4,
        numReviews: 198
      },
      // Mobiles
      {
        title: 'iPhone 15 Pro Max',
        description: 'A17 Pro chip. 48MP camera system. Titanium design. Action button. USB-C with USB 3 speeds. Up to 29 hours video playback.',
        mainImg: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&fit=crop',
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&fit=crop',
          'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&fit=crop'
        ],
        sizes: ['128GB', '256GB', '512GB', '1TB'],
        category: 'Mobiles',
        gender: 'Unisex',
        price: 159900,
        discount: 5,
        stock: 30,
        rating: 4.9,
        numReviews: 890
      },
      {
        title: 'Samsung Galaxy S24 Ultra',
        description: 'Galaxy AI built in. 200MP camera. S Pen included. Titanium frame. 5000mAh battery with 45W fast charging.',
        mainImg: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&fit=crop',
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&fit=crop',
          'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&fit=crop'
        ],
        sizes: ['256GB', '512GB', '1TB'],
        category: 'Mobiles',
        gender: 'Unisex',
        price: 134999,
        discount: 8,
        stock: 40,
        rating: 4.7,
        numReviews: 654
      },
      // Sports Equipment
      {
        title: 'Nike Air Zoom Running Shoes',
        description: 'Responsive cushioning for your daily run. Breathable mesh upper. Durable rubber outsole. Lightweight and comfortable.',
        mainImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&fit=crop',
          'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&fit=crop',
          'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&fit=crop'
        ],
        sizes: ['7', '8', '9', '10', '11'],
        category: 'Sports-Equipment',
        gender: 'Men',
        price: 8999,
        discount: 15,
        stock: 100,
        rating: 4.5,
        numReviews: 423
      },
      {
        title: 'Yoga Mat Premium 6mm',
        description: 'Non-slip surface with alignment lines. Extra thick 6mm cushioning. Eco-friendly TPE material. Includes carrying strap.',
        mainImg: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&fit=crop',
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&fit=crop',
          'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&fit=crop'
        ],
        sizes: [],
        category: 'Sports-Equipment',
        gender: 'Unisex',
        price: 1499,
        discount: 20,
        stock: 300,
        rating: 4.3,
        numReviews: 567
      },
      // Groceries
      {
        title: 'Organic Green Tea (100 bags)',
        description: 'Premium organic green tea sourced from Darjeeling. Rich in antioxidants. Refreshing taste with natural aroma.',
        mainImg: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&fit=crop',
          'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&fit=crop',
          'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&fit=crop'
        ],
        sizes: [],
        category: 'Groceries',
        gender: 'Unisex',
        price: 599,
        discount: 10,
        stock: 500,
        rating: 4.4,
        numReviews: 234
      },
      {
        title: 'Premium Basmati Rice 5kg',
        description: 'Aged basmati rice with extra-long grains. Aromatic and fluffy when cooked. Perfect for biryani and pulao.',
        mainImg: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&fit=crop',
          'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&fit=crop',
          'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=800&fit=crop'
        ],
        sizes: [],
        category: 'Groceries',
        gender: 'Unisex',
        price: 899,
        discount: 5,
        stock: 200,
        rating: 4.6,
        numReviews: 345
      },
      // Home & Kitchen
      {
        title: 'Stainless Steel Cookware Set (5 pcs)',
        description: 'Premium stainless steel cookware set. Includes kadai, frying pan, saucepan, and 2 cooking pots. Induction compatible.',
        mainImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&fit=crop',
          'https://images.unsplash.com/photo-1584990347449-a6d1c1a0d3e8?w=800&fit=crop',
          'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&fit=crop'
        ],
        sizes: [],
        category: 'Home & Kitchen',
        gender: 'Unisex',
        price: 4999,
        discount: 30,
        stock: 60,
        rating: 4.5,
        numReviews: 178
      },
      // Books
      {
        title: 'The Psychology of Money',
        description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel. A must-read for understanding personal finance.',
        mainImg: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&fit=crop',
          'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&fit=crop',
          'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&fit=crop'
        ],
        sizes: [],
        category: 'Books',
        gender: 'Unisex',
        price: 399,
        discount: 15,
        stock: 400,
        rating: 4.7,
        numReviews: 890
      },
      {
        title: 'Women Running Shoes Lightweight',
        description: 'Ultra-lightweight running shoes for women. Breathable knit upper. Memory foam insole for all-day comfort.',
        mainImg: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop',
        carousel: [
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&fit=crop',
          'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&fit=crop',
          'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&fit=crop'
        ],
        sizes: ['5', '6', '7', '8'],
        category: 'Sports-Equipment',
        gender: 'Women',
        price: 5999,
        discount: 25,
        stock: 120,
        rating: 4.4,
        numReviews: 267
      }
    ];

    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully!`);

    console.log('\n========================================');
    console.log('  DATABASE SEEDED SUCCESSFULLY!');
    console.log('========================================');
    console.log('\nLogin Credentials:');
    console.log('  Admin:    admin@shopez.com / admin123');
    console.log('  Customer: john@example.com / customer123');
    console.log(`\nProducts: ${products.length} items across ${categories.length} categories`);
    console.log('========================================\n');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
};

seedData();
