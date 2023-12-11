import React from 'react';

const Note = ({ note, onDelete, onArchive, onMoveToActive, active }) => {
  return (
    <div className={`note ${active ? 'active' : 'archived'}`}>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      {active && (
        <button className="delete" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      )}
      {active ? (
        <button className="archive" onClick={() => onArchive(note.id)}>
          Archive
        </button>
      ) : (
        <button onClick={() => onMoveToActive(note.id)}>
          Move to Active
        </button>
      )}
      {!active && (
        <button className="delete" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      )}
    </div>
  );
};

export default Note;
