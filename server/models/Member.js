import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  badges: [{ type: String }],
  verified: { type: Boolean, default: false },
  joinedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Member', memberSchema);
