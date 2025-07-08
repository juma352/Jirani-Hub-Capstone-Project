import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceName: { type: String, required: true },
  description: { type: String },
  ratePerHour: { type: Number },
  availability: { type: String }, // e.g., weekdays, weekends
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Service', serviceSchema);
