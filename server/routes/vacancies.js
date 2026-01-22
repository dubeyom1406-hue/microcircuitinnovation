const express = require('express');
const router = express.Router();

// Mock data for vacancies (in production, this would be stored in a database)
let vacancies = [
  { id: 1, title: 'ASIC Physical Designer', exp: '5+ Years Experience', location: 'Ahmedabad | Bangalore', date: '22nd July 2025', description: 'Design and develop ASIC physical layouts' },
  { id: 2, title: 'ASIC DFT Intern', exp: 'ME/MTech 2025 Pass Out', location: 'Ahmedabad', date: '21st July 2025', description: 'Internship for Design for Testability projects' },
  { id: 3, title: 'Sr. ASIC DFT Designer', exp: '5+ Years Experience', location: 'Ahmedabad | Bangalore', date: '23rd July 2025', description: 'Senior role for DFT design and implementation' },
  { id: 4, title: 'HR Executive', exp: '3+ Years Experience', location: 'Ahmedabad | Bangalore', date: '1st August 2024', description: 'HR responsibilities for semiconductor company' }
];

// Get all vacancies
router.get('/', (req, res) => {
  res.json(vacancies);
});

// Get a specific vacancy
router.get('/:id', (req, res) => {
  const vacancy = vacancies.find(v => v.id === parseInt(req.params.id));
  if (!vacancy) {
    return res.status(404).json({ message: 'Vacancy not found' });
  }
  res.json(vacancy);
});

// Create a new vacancy
router.post('/', (req, res) => {
  const { title, exp, location, description, pdfUrl } = req.body;
  
  if (!title || !exp || !location) {
    return res.status(400).json({ message: 'Title, experience, and location are required' });
  }
  
  const newVacancy = {
    id: Date.now(), // In a real app, this would be handled by the database
    title,
    exp,
    location,
    description: description || '',
    pdfUrl: pdfUrl || '',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  };
  
  vacancies.push(newVacancy);
  res.status(201).json(newVacancy);
});

// Update a vacancy
router.put('/:id', (req, res) => {
  const vacancyIndex = vacancies.findIndex(v => v.id === parseInt(req.params.id));
  if (vacancyIndex === -1) {
    return res.status(404).json({ message: 'Vacancy not found' });
  }
  
  const { title, exp, location, description, pdfUrl } = req.body;
  
  if (!title || !exp || !location) {
    return res.status(400).json({ message: 'Title, experience, and location are required' });
  }
  
  vacancies[vacancyIndex] = {
    ...vacancies[vacancyIndex],
    title,
    exp,
    location,
    description: description || '',
    pdfUrl: pdfUrl || ''
  };
  
  res.json(vacancies[vacancyIndex]);
});

// Delete a vacancy
router.delete('/:id', (req, res) => {
  const vacancyIndex = vacancies.findIndex(v => v.id === parseInt(req.params.id));
  if (vacancyIndex === -1) {
    return res.status(404).json({ message: 'Vacancy not found' });
  }
  
  vacancies.splice(vacancyIndex, 1);
  res.json({ message: 'Vacancy deleted successfully' });
});

module.exports = router;