import Announcement from '../models/Announcement.js';

// Create a new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = new Announcement({
      title,
      message,
      createdBy: req.user._id
    });
    await announcement.save();
    res.status(201).json({ success: true, announcement });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all active announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ active: true }).populate('createdBy', 'name');
    res.status(200).json({ success: true, announcements });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Deactivate an announcement
export const deactivateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    announcement.active = false;
    await announcement.save();
    res.status(200).json({ success: true, message: 'Announcement deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
