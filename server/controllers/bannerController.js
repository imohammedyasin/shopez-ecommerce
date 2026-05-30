import { Admin } from '../models/Schema.js';

// Public route - fetch banner for homepage
export const getAllBanners = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    res.json(admin ? admin.banner : '');
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch banners' });
  }
};
