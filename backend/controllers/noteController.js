// backend/controllers/noteController.js
const Note = require('../models/Note.js');

const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const note = new Note({
    user: req.user.id,
    title,
    content,
  });

  await note.save();
  res.status(201).json(note);
};

const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note || note.user.toString() !== req.user.id) {
    return res.status(404).json({ message: 'Note not found' });
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  await note.save();

  res.json(note);
};

const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note || note.user.toString() !== req.user.id) {
    return res.status(404).json({ message: 'Note not found' });
  }

  await note.deleteOne();
  res.json({ message: 'Note deleted' });
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
