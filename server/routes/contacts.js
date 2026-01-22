const express = require('express');
const router = express.Router();

// Mock data for contact messages (in production, this would be stored in a database)
let contactMessages = [];

// Get all contact messages
router.get('/', (req, res) => {
  res.json(contactMessages);
});

// Get a specific contact message
router.get('/:id', (req, res) => {
  const message = contactMessages.find(m => m.id === parseInt(req.params.id));
  if (!message) {
    return res.status(404).json({ message: 'Contact message not found' });
  }
  res.json(message);
});

// Create a new contact message
router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }
  
  const newMessage = {
    id: Date.now(), // In a real app, this would be handled by the database
    name,
    email,
    phone: phone || '',
    subject: subject || 'No subject',
    message,
    timestamp: new Date().toLocaleString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  contactMessages.push(newMessage);
  res.status(201).json(newMessage);
});

// Delete a contact message
router.delete('/:id', (req, res) => {
  const messageIndex = contactMessages.findIndex(m => m.id === parseInt(req.params.id));
  if (messageIndex === -1) {
    return res.status(404).json({ message: 'Contact message not found' });
  }
  
  contactMessages.splice(messageIndex, 1);
  res.json({ message: 'Contact message deleted successfully' });
});

module.exports = router;