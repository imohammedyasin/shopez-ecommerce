import { Product, Admin } from '../models/Schema.js';

// ================== Fetch Products (with pagination & search) ==================
export const fetchProducts = async (req, res) => {
  try {
    const { page, limit, search, category, gender } = req.query;

    let filter = {};

    // Text search on title/description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (gender) {
      filter.gender = gender;
    }

    // If pagination params provided, paginate
    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const total = await Product.countDocuments(filter);
      const products = await Product.find(filter).skip(skip).limit(limitNum);

      return res.json({
        products,
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalProducts: total
      });
    }

    // No pagination - return all (backward compatible)
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

// ================== Fetch Product Details ==================
export const fetchProductDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

// ================== Fetch Categories ==================
export const fetchCategories = async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({ banner: '', categories: [] });
      await admin.save();
    }
    res.json(admin.categories);
  } catch (err) {
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};

// ================== Add Product (Admin only) ==================
export const addNewProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productMainImg,
    productCarousel,
    productSizes,
    productGender,
    productCategory,
    productNewCategory,
    productPrice,
    productDiscount
  } = req.body;

  try {
    if (req.user.usertype !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    let category = productCategory;

    if (productCategory === 'new category') {
      const admin = await Admin.findOne();
      admin.categories.push(productNewCategory);
      await admin.save();
      category = productNewCategory;
    }

    const newProduct = new Product({
      title: productName,
      description: productDescription,
      mainImg: productMainImg,
      carousel: productCarousel,
      category,
      sizes: productSizes,
      gender: productGender,
      price: productPrice,
      discount: productDiscount
    });
    await newProduct.save();

    res.status(201).json({ message: 'Product added!!' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

// ================== Update Product (Admin only) ==================
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const {
    productName,
    productDescription,
    productMainImg,
    productCarousel,
    productSizes,
    productGender,
    productCategory,
    productNewCategory,
    productPrice,
    productDiscount
  } = req.body;

  try {
    if (req.user.usertype !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (productCategory === 'new category') {
      const admin = await Admin.findOne();
      admin.categories.push(productNewCategory);
      await admin.save();
      product.category = productNewCategory;
    } else {
      product.category = productCategory;
    }

    product.title = productName;
    product.description = productDescription;
    product.mainImg = productMainImg;
    product.carousel = productCarousel;
    product.sizes = productSizes;
    product.gender = productGender;
    product.price = productPrice;
    product.discount = productDiscount;

    await product.save();

    res.json({ message: 'Product updated!!' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

// ================== Delete Product (Admin only) ==================
export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    if (req.user.usertype !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted!!' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};
