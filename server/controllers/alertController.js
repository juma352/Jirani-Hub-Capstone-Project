import Alert from '../models/Alert.js';

// Create a new alert
export const createAlert = async (req, res) => {
  try {
    const { title, message, isUrgent, category, location } = req.body;
    const alert = new Alert({
      title,
      message,
      isUrgent,
      category: category || 'general',
      location,
      createdBy: req.user._id
    });
    const savedAlert = await alert.save();
    await savedAlert.populate('createdBy', 'name');
    res.status(201).json({ success: true, alert: savedAlert });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all active alerts
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ active: true })
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, alerts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Deactivate an alert
export const deactivateAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }
    
    // Check if user is authorized to deactivate
    if (req.user.role !== 'admin' && req.user.role !== 'moderator' && alert.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to deactivate this alert' });
    }
    
    alert.active = false;
    await alert.save();
    res.status(200).json({ success: true, message: 'Alert deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Acknowledge an alert
export const acknowledgeAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }
    
    if (!alert.acknowledged.includes(req.user._id)) {
      alert.acknowledged.push(req.user._id);
      await alert.save();
    }
    
    res.status(200).json({ success: true, message: 'Alert acknowledged' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
