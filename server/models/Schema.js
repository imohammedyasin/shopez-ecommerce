import mongoose from "mongoose";

// ==================== USER SCHEMA ====================
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  usertype: { type: String, required: true, enum: ['customer', 'admin'], default: 'customer' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.index({ email: 1 });

// ==================== ADMIN SCHEMA ====================
const adminSchema = new mongoose.Schema({
  banner: { type: String, default: '' },
  categories: { type: [String], default: [] }
});

// ==================== PRODUCT SCHEMA ====================
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  mainImg: { type: String, required: true },
  carousel: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  category: { type: String, required: true },
  gender: { type: String, enum: ['Men', 'Women', 'Unisex'], default: 'Unisex' },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  stock: { type: Number, default: 100, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

productSchema.index({ category: 1 });
productSchema.index({ title: 'text', description: 'text' });

// ==================== ORDER SCHEMA ====================
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  mainImg: { type: String },
  size: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  paymentMethod: { type: String, required: true, enum: ['netbanking', 'card', 'upi', 'cod'] },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  orderStatus: { type: String, default: 'Order placed', enum: ['Order placed', 'In-transit', 'Delivered', 'Cancelled'] }
});

orderSchema.index({ userId: 1 });
orderSchema.index({ orderStatus: 1 });

// ==================== CART SCHEMA ====================
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  mainImg: { type: String },
  size: { type: String },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }
});

cartSchema.index({ userId: 1 });

// ==================== EXPORTS ====================
export const User = mongoose.model('users', userSchema);
export const Admin = mongoose.model('admin', adminSchema);
export const Product = mongoose.model('products', productSchema);
export const Orders = mongoose.model('orders', orderSchema);
export const Cart = mongoose.model('cart', cartSchema);
