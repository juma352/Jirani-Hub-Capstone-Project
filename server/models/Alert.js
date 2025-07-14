import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['general', 'security', 'maintenance', 'event', 'weather', 'traffic'],
    default: 'general'
  },
  location: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  isUrgent: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  acknowledged: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Alert', alertSchema);
