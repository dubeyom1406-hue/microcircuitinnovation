require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is broken or missing in .env.local');
    process.exit(1);
}

console.log('Testing Connection to:', MONGODB_URI.replace(/:([^:@]{1,})@/, ':****@'));

async function testConnection() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully!');

        // Define simple schema to test querying (Since we can't easily import ES6 models in CJS script without setup)
        const VacancySchema = new mongoose.Schema({ title: String });
        const Vacancy = mongoose.models.Vacancy || mongoose.model('Vacancy', VacancySchema);

        console.log('Querying Vacancies...');
        const count = await Vacancy.countDocuments();
        console.log(`✅ Vacancies found: ${count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Connection Failed:', error);
        process.exit(1);
    }
}

testConnection();
