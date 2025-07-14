import Announcement from '../models/Announcement.js';

// Create a new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, category, isPinned } = req.body;
    const announcement = new Announcement({
      title,
      message,
      category: category || 'general',
      isPinned: isPinned || false,
      createdBy: req.user._id
    });
    const savedAnnouncement = await announcement.save();
    await savedAnnouncement.populate('createdBy', 'name');
    res.status(201).json({ success: true, announcement: savedAnnouncement });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all active announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ active: true })
      .populate('createdBy', 'name')
      .populate('comments.user', 'name')
      .sort({ isPinned: -1, createdAt: -1 });
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
    
    // Check if user is authorized to deactivate
    if (req.user.role !== 'admin' && req.user.role !== 'moderator' && announcement.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to deactivate this announcement' });
    }
    
    announcement.active = false;
    await announcement.save();
    res.status(200).json({ success: true, message: 'Announcement deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Like/Unlike an announcement
export const toggleLike = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    
    const userIndex = announcement.likes.indexOf(req.user._id);
    if (userIndex > -1) {
      announcement.likes.splice(userIndex, 1);
    } else {
      announcement.likes.push(req.user._id);
    }
    
    await announcement.save();
    res.status(200).json({ success: true, likes: announcement.likes.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add comment to announcement
export const addComment = async (req, res) => {
  try {
    const { message } = req.body;
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    
    announcement.comments.push({
      user: req.user._id,
      message
    });
    
    await announcement.save();
    await announcement.populate('comments.user', 'name');
    res.status(201).json({ success: true, comments: announcement.comments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
