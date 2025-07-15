import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: false },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('Chat', chatSchema);
