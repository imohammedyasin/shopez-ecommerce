import express from "express";
import { fetchBanner, updateBanner } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only routes
router.get("/fetch-banner", protect, adminOnly, fetchBanner);
router.post("/update-banner", protect, adminOnly, updateBanner);

export default router;
