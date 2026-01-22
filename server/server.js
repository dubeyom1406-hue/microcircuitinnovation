const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/microcircuits';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
const adminRoutes = require('./routes/admin');
const vacancyRoutes = require('./routes/vacancies');
const caseStudyRoutes = require('./routes/caseStudies');
const applicationRoutes = require('./routes/applications');
const contactRoutes = require('./routes/contacts');

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/vacancies', vacancyRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contacts', contactRoutes);

// Serve static files from frontend
app.use(express.static('../microcircuits/dist'));

// Default route to serve frontend
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/../microcircuits/dist/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});