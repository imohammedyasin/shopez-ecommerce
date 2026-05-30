/**
 * Input validation middleware
 */

export const validateRegistration = (req, res, next) => {
  const { username, email, password, usertype } = req.body;

  if (!username || !email || !password || !usertype) {
    return res.status(400).json({ message: "All fields are required: username, email, password, usertype" });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Password minimum length
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  // Usertype validation
  if (!['customer', 'admin'].includes(usertype)) {
    return res.status(400).json({ message: "Usertype must be 'customer' or 'admin'" });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  next();
};

export const validateProduct = (req, res, next) => {
  const { productName, productPrice } = req.body;

  if (!productName) {
    return res.status(400).json({ message: "Product name is required" });
  }

  if (productPrice === undefined || productPrice === null || productPrice < 0) {
    return res.status(400).json({ message: "Valid product price is required" });
  }

  next();
};

export const validateOrder = (req, res, next) => {
  const { name, email, mobile, address, pincode, paymentMethod } = req.body;

  if (!name || !email || !mobile || !address || !pincode || !paymentMethod) {
    return res.status(400).json({ message: "All checkout fields are required: name, email, mobile, address, pincode, paymentMethod" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  next();
};

export const validateCartItem = (req, res, next) => {
  const { title, price, quantity } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Product title is required" });
  }

  if (price === undefined || price < 0) {
    return res.status(400).json({ message: "Valid price is required" });
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  next();
};
