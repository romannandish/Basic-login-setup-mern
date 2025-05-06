// backend/routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes should use auth middleware to protect them
router.get('/', authMiddleware, getNotes);
router.post('/', authMiddleware, createNote);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;
