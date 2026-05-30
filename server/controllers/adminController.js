import { Admin } from '../models/Schema.js';

// Fetch banner (admin only)
export const fetchBanner = async (req, res) => {
  try {
    if (req.user.usertype !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const admin = await Admin.findOne();
    res.json(admin ? admin.banner : null);
  } catch (err) {
    res.status(500).json({ message: "Error occurred" });
  }
};

// Update banner (admin only)
export const updateBanner = async (req, res) => {
  const { banner } = req.body;
  try {
    if (req.user.usertype !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({ banner, categories: [] });
      await admin.save();
      return res.json({ message: "Banner updated" });
    }

    admin.banner = banner;
    await admin.save();
    res.json({ message: "Banner updated" });
  } catch (err) {
    res.status(500).json({ message: "Error occurred" });
  }
};
