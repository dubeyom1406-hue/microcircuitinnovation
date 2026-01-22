const express = require('express');
const router = express.Router();

// Mock data for applications (in production, this would be stored in a database)
let applications = [];

// Get all applications
router.get('/', (req, res) => {
  res.json(applications);
});

// Get a specific application
router.get('/:id', (req, res) => {
  const application = applications.find(a => a.id === parseInt(req.params.id));
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  res.json(application);
});

// Create a new application
router.post('/', (req, res) => {
  const { name, email, phone, jobTitle, experience, resumeName, resumeFile } = req.body;
  
  if (!name || !email || !jobTitle) {
    return res.status(400).json({ message: 'Name, email, and job title are required' });
  }
  
  const newApplication = {
    id: Date.now(), // In a real app, this would be handled by the database
    name,
    email,
    phone: phone || '',
    jobTitle,
    experience: experience || '',
    resumeName: resumeName || 'No resume',
    resumeFile: resumeFile || null,
    timestamp: new Date().toLocaleString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  applications.push(newApplication);
  res.status(201).json(newApplication);
});

// Delete an application
router.delete('/:id', (req, res) => {
  const applicationIndex = applications.findIndex(a => a.id === parseInt(req.params.id));
  if (applicationIndex === -1) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  applications.splice(applicationIndex, 1);
  res.json({ message: 'Application deleted successfully' });
});

module.exports = router;