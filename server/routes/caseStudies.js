const express = require('express');
const router = express.Router();

// Mock data for case studies (in production, this would be stored in a database)
let caseStudies = [
  { id: 1, category: 'Design For Testability', title: 'Engineering DFT Design Principles', date: '23rd July 2025', description: 'Advanced principles for DFT design' },
  { id: 2, category: 'Physical Design', title: 'Voltus AI Insights', date: '21st July 2025', description: 'Power analysis using AI techniques' },
  { id: 3, category: 'Design & Verification', title: 'Engineering DFT Design Principles', date: '12th June 2025', description: 'Verification methodologies for complex designs' },
  { id: 4, category: 'Semiconductor News', title: 'China against US EDA Policies', date: '1st May 2025', description: 'Analysis of geopolitical impacts on EDA industry' },
  { id: 5, category: 'Design For Testability', title: 'Engineering DFT Design Principles', date: '14th April 2025', description: 'Advanced testing techniques for modern ICs' },
  { id: 6, category: 'Physical Design', title: 'Power, Performance, and PPA: Stories Behind the Numbers', date: '13th April 2025', description: 'PPA optimization strategies' }
];

// Get all case studies
router.get('/', (req, res) => {
  res.json(caseStudies);
});

// Get a specific case study
router.get('/:id', (req, res) => {
  const study = caseStudies.find(s => s.id === parseInt(req.params.id));
  if (!study) {
    return res.status(404).json({ message: 'Case study not found' });
  }
  res.json(study);
});

// Create a new case study
router.post('/', (req, res) => {
  const { category, title, description, pdfUrl } = req.body;
  
  if (!category || !title) {
    return res.status(400).json({ message: 'Category and title are required' });
  }
  
  const newStudy = {
    id: Date.now(), // In a real app, this would be handled by the database
    category,
    title,
    description: description || '',
    pdfUrl: pdfUrl || '',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  };
  
  caseStudies.push(newStudy);
  res.status(201).json(newStudy);
});

// Update a case study
router.put('/:id', (req, res) => {
  const studyIndex = caseStudies.findIndex(s => s.id === parseInt(req.params.id));
  if (studyIndex === -1) {
    return res.status(404).json({ message: 'Case study not found' });
  }
  
  const { category, title, description, pdfUrl } = req.body;
  
  if (!category || !title) {
    return res.status(400).json({ message: 'Category and title are required' });
  }
  
  caseStudies[studyIndex] = {
    ...caseStudies[studyIndex],
    category,
    title,
    description: description || '',
    pdfUrl: pdfUrl || ''
  };
  
  res.json(caseStudies[studyIndex]);
});

// Delete a case study
router.delete('/:id', (req, res) => {
  const studyIndex = caseStudies.findIndex(s => s.id === parseInt(req.params.id));
  if (studyIndex === -1) {
    return res.status(404).json({ message: 'Case study not found' });
  }
  
  caseStudies.splice(studyIndex, 1);
  res.json({ message: 'Case study deleted successfully' });
});

module.exports = router;