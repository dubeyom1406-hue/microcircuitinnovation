import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: false,
    },
    resumeUrl: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['New', 'Reviewing', 'Interview', 'Offer', 'Rejected'],
        default: 'New',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
