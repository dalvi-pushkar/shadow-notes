import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function CreateNote() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/notes', { content });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create note');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="40"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Save Note</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreateNote;
