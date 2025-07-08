import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    location: {type: String, required: true},
    role:{
        type: String,
        enum: ['resident', 'moderator', 'admin'],
        default: 'resident',
    },

        profileImage: {type: String},
        services: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Service'
        }],
        listings: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Listing'
        }],
        createdAt: {type: Date, default: Date.now},
    });

        export default mongoose.model('User', userSchema);