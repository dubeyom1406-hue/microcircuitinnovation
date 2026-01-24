import mongoose from 'mongoose';

const CaseStudySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    client: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    challenge: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    },
    results: {
        type: [String],
        required: true,
    },
    imageUrl: {
        type: String, // Can be a URL or path
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.CaseStudy || mongoose.model('CaseStudy', CaseStudySchema);
