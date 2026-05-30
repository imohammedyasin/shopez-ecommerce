import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001;

// Middleware
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or database seeders)
    if (!origin) return callback(null, true);
    
    // Whitelist localhost and any subdomain ending in .vercel.app
    if (origin.endsWith('.vercel.app') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/banners', bannerRoutes);

// Serve static assets in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Error handling
app.use(notFound);
app.use(errorHandler);

// DB Connection
connectDB();

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
