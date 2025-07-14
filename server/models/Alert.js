import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  isUrgent: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
});

export default mongoose.model('Alert', alertSchema);
