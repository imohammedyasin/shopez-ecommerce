import jwt from "jsonwebtoken";
import { User } from "../models/Schema.js";

/**
 * Protect routes - verifies JWT and attaches full user object to req.user
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach full user object (excluding password) to req
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

/**
 * Admin-only middleware - must be used after protect
 */
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.usertype === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
