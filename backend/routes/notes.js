const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// ✅ Get all notes for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    console.log('🟢 GET /api/notes triggered');
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error('❌ Error fetching notes:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Create a new note
router.post('/', auth, async (req, res) => {
  console.log('🟢 POST /api/notes triggered');
  console.log('Body:', req.body);
  console.log('User:', req.user);

  const { title = '', content, trashed = false, pinned = false, type = 'private' } = req.body;

  if (!content) {
    return res.status(400).json({ msg: 'Content is required' });
  }

  try {
    const newNote = new Note({
      userId: req.user.id,
      title,
      content,
      trashed,
      pinned,
      type,
    });

    await newNote.save();
    console.log('✅ Note saved:', newNote);
    res.json({ msg: 'Note created', note: newNote });
  } catch (err) {
    console.error('❌ Error creating note:', err);
    res.status(500).json({ msg: 'Error creating note' });
  }
});

// ✅ Update a note
router.put('/:id', auth, async (req, res) => {
  const allowedFields = ['title', 'content', 'trashed', 'pinned'];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: updates },
      { new: true }
    );

    if (!note) return res.status(404).json({ msg: 'Note not found' });

    res.json({ msg: 'Note updated', note });
  } catch (err) {
    console.error('❌ Error updating note:', err);
    res.status(500).json({ msg: 'Error updating note' });
  }
});

// ✅ Permanent delete a note
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!note) return res.status(404).json({ msg: 'Note not found' });

    res.json({ msg: 'Note permanently deleted' });
  } catch (err) {
    console.error('❌ Error deleting note:', err);
    res.status(500).json({ msg: 'Error deleting note' });
  }
});

module.exports = router;
