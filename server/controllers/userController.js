import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.status(200).json(users);
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
