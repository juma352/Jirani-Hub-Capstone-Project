import Member from '../models/Member.js';

// Get all verified members
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find({ verified: true }).populate('user', 'name location');
    res.status(200).json({ success: true, members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get member by ID
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('user', 'name location badges');
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.status(200).json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
