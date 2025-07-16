const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    required: true,
  },
  trashed: {
    type: Boolean,
    default: false,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['private', 'public'],
    default: 'private',
  },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
