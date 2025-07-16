import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaMoon, FaSun, FaPlus, FaTrash, FaEdit,
  FaThumbtack, FaUndo, FaTrashAlt, FaSignOutAlt
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
const API_BASE = window?.env?.REACT_APP_API_URL || '';

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [showModal, setShowModal] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotes(data.map((note) => ({
          id: note._id,
          title: note.title || '',
          content: note.content || '',
          pinned: note.pinned || false,
          trashed: note.trashed || false,
        })));
      }
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) return alert("Note content is required.");

    const url = editingNoteId
  ? `${API_BASE}/api/notes/${editingNoteId}`
  : `${API_BASE}/api/notes`;
const method = editingNoteId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Failed to save note');

      const newNote = {
        id: data.note._id,
        title: data.note.title,
        content: data.note.content,
        pinned: data.note.pinned,
        trashed: data.note.trashed,
      };

      if (editingNoteId) {
        setNotes(prev => prev.map(n => n.id === editingNoteId ? newNote : n));
      } else {
        setNotes(prev => [...prev, newNote]);
      }

      setForm({ title: '', content: '' });
      setEditingNoteId(null);
      setShowModal(false);
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving note');
    }
  };

  const patchNote = async (id, updates) => {
    try {
      const res = await fetch(`${API_BASE}/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Failed to update note');

      setNotes(prev =>
        prev.map(n => n.id === id
          ? {
            id: data.note._id,
            title: data.note.title,
            content: data.note.content,
            pinned: data.note.pinned,
            trashed: data.note.trashed,
          }
          : n
        )
      );
    } catch (err) {
      console.error('Patch failed:', err);
    }
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditingNoteId(note.id);
    setShowModal(true);
  };

  const handleDelete = (id) => patchNote(id, { trashed: true });
  const handleRestore = (id) => patchNote(id, { trashed: false });

  const handlePermanentDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/notes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleTogglePin = (id) => {
    const note = notes.find(n => n.id === id);
    if (note) patchNote(id, { pinned: !note.pinned });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredNotes = notes
    .filter(n =>
      !n.trashed &&
      (n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => b.pinned - a.pinned);

  const trashedNotes = notes.filter(n => n.trashed);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-neutral-900 text-black dark:text-white transition-colors duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Shadow Notes</h1>
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-xl bg-input text-black dark:text-white dark:bg-white/10 border border-white/30 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-3 items-center justify-end">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
          >
            <FaPlus /> <span className="hidden sm:inline">New Note</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-600 text-white p-3 rounded-full shadow hover:bg-red-700"
          >
            <FaSignOutAlt />
          </motion.button>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/30 dark:bg-black/30 border border-white/20 backdrop-blur-md shadow-md"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* NOTES */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pb-28">
        {filteredNotes.map(note => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-white/40 dark:bg-neutral-900 backdrop-blur-xl border border-white/30 shadow p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <button
                onClick={() => handleTogglePin(note.id)}
                className={`text-yellow-500 hover:text-yellow-600 ${note.pinned ? '' : 'opacity-40'}`}
              >
                <FaThumbtack />
              </button>
            </div>
            <p className="text-sm text-muted dark:text-gray-400">{note.content}</p>
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => handleEdit(note)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
              <button onClick={() => handleDelete(note.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* TRASH BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTrashModal(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xl"
      >
        <FaTrashAlt />
      </motion.button>

      {/* MODALS */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          >
            <div className="w-[90%] max-w-xl bg-white/40 dark:bg-neutral-900 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingNoteId ? 'Edit Note' : 'New Note'}</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingNoteId(null);
                    setForm({ title: '', content: '' });
                  }}
                  className="text-xl font-bold text-gray-600 dark:text-gray-300 hover:text-red-500"
                >✕</button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Note Title"
                  className="w-full p-4 rounded-xl bg-input text-black dark:text-white dark:bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Write your thoughts..."
                  rows="5"
                  className="w-full p-4 rounded-xl bg-input text-black dark:text-white dark:bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  type="submit"
                  className="w-full bg-blue-600 dark:bg-blue-400 text-white py-3 rounded-xl shadow hover:bg-blue-700 dark:hover:bg-blue-500 font-semibold"
                >
                  {editingNoteId ? 'Update Note' : 'Save Note'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTrashModal && (
          <motion.div
            key="trashModal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          >
            <div className="w-[90%] max-w-2xl bg-white/40 dark:bg-neutral-900 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-6 relative max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Trashed Notes</h2>
                <button
                  onClick={() => setShowTrashModal(false)}
                  className="text-xl font-bold text-gray-600 dark:text-gray-300 hover:text-red-500"
                >✕</button>
              </div>
              {trashedNotes.length === 0 ? (
                <p className="text-gray-500 text-center py-6">Trash is empty</p>
              ) : (
                trashedNotes.map((note) => (
                  <div key={note.id} className="mb-4 p-4 bg-white/50 dark:bg-white/10 rounded-xl border border-white/20">
                    <h3 className="text-md font-semibold line-through">{note.title}</h3>
                    <p className="text-sm text-muted dark:text-gray-400 line-through">{note.content}</p>
                    <div className="flex justify-end gap-4 mt-2">
                      <button onClick={() => handleRestore(note.id)} className="text-green-600 hover:text-green-800"><FaUndo /> Restore</button>
                      <button onClick={() => handlePermanentDelete(note.id)} className="text-red-600 hover:text-red-800"><FaTrash /> Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
