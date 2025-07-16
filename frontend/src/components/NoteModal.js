import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NoteModal = ({ isOpen, onClose, onSave }) => {
  const [note, setNote] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(note);
    setNote({ title: '', content: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-white/10 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">New Note</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="content"
                value={note.content}
                onChange={handleChange}
                placeholder="Write your note..."
                required
                rows="5"
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 dark:bg-zinc-700 text-black dark:text-white rounded-xl hover:bg-gray-400 dark:hover:bg-zinc-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteModal;
