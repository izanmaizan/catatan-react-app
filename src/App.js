import React, { useState } from 'react';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import { getInitialData, showFormattedDate } from './utils';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [activeNotes, setActiveNotes] = useState(notes.filter((note) => !note.archived));
  const [archivedNotes, setArchivedNotes] = useState(notes.filter((note) => note.archived));
  const [newNote, setNewNote] = useState({ title: '', body: '' });

  const handleDelete = (id) => {
    const updatedNotes = activeNotes.filter((note) => note.id !== id);
    const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== id);
    setActiveNotes(updatedNotes);
    setArchivedNotes(updatedArchivedNotes);
  };

  const handleArchive = (id) => {
    const noteToArchive = activeNotes.find((note) => note.id === id);
    const updatedNotes = activeNotes.filter((note) => note.id !== id);
    setArchivedNotes([noteToArchive, ...archivedNotes]);
    setActiveNotes(updatedNotes);
  };

  const handleMoveToActive = (id) => {
    const noteToMove = archivedNotes.find((note) => note.id === id);
    const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== id);
    setActiveNotes([noteToMove, ...activeNotes]);
    setArchivedNotes(updatedArchivedNotes);
  };

  const handleSearch = (keyword) => {
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setActiveNotes(filteredNotes.filter((note) => !note.archived));
    setArchivedNotes(filteredNotes.filter((note) => note.archived));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const handleCreateNote = () => {
    if (newNote.title && newNote.body) {
      const timestamp = +new Date();
      const createdNote = {
        id: timestamp,
        title: newNote.title,
        body: newNote.body,
        createdAt: showFormattedDate(timestamp),
        archived: false,
      };
      setNotes([createdNote, ...notes]); // Menempatkan catatan baru di awal array
      setActiveNotes([createdNote, ...activeNotes]);
      setNewNote({ title: '', body: '' });
    }
  };

  return (
    <div className="app">
      <div className="navbar">
        <div className="title">Notes</div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="note-form">
        <input
          type="text"
          name="title"
          placeholder="Title (max 50 characters)"
          value={newNote.title}
          maxLength={50}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          placeholder="Your note..."
          value={newNote.body}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateNote}>Create Note</button>
      </div>
      <div className="note-list-container">
        <NoteList
          notes={activeNotes}
          onDelete={handleDelete}
          onArchive={handleArchive}
          onMoveToActive={handleMoveToActive}
          active
        />
        <NoteList
          notes={archivedNotes}
          onDelete={handleDelete}
          onArchive={handleArchive}
          onMoveToActive={handleMoveToActive}
        />
      </div>
    </div>
  );
};

export default App;
