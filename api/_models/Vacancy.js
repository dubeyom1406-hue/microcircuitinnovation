
import mongoose from 'mongoose';

const VacancySchema = new mongoose.Schema({
    title: { type: String, required: true },
    exp: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    pdfUrl: { type: String, default: '#' },
});

export default mongoose.models.Vacancy || mongoose.model('Vacancy', VacancySchema);
