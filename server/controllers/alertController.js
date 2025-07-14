import Alert from '../models/Alert.js';

// Create a new alert
export const createAlert = async (req, res) => {
  try {
    const { title, message, isUrgent } = req.body;
    const alert = new Alert({
      title,
      message,
      isUrgent,
      createdBy: req.user._id
    });
    await alert.save();
    res.status(201).json({ success: true, alert });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all active alerts
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ active: true }).populate('createdBy', 'name');
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
    alert.active = false;
    await alert.save();
    res.status(200).json({ success: true, message: 'Alert deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
