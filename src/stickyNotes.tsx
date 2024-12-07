import React, { useState } from 'react';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import ToggleTheme from './hooksExercise';
import { FavoriteNotes } from "./favNotes1";

export const StickyNotes = () => {
    // your code from App.tsx
    const [notes, setNotes] = useState(dummyNotesList); 
    const initialNote = {
      id: -1,
      title: "",
      content: "",
      label: Label.other,
    };
    const [createNote, setCreateNote] = useState(initialNote);
    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
  
    const createNoteHandler = (event: React.FormEvent) => {
      event.preventDefault();
      const newNote = { ...createNote, id: notes.length + 1 };
      setNotes([...notes, newNote]);
      setCreateNote(initialNote);
    };
  
    const [favorites, setFavorites] = useState<string[]>([]); // State to hold favorite note titles
    const toggleFavorite = (title: string) => {
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(title)) {
          console.log(`Removing ${title} from favorites`);
          return prevFavorites.filter((t) => t !== title); // Remove title if already a favorite
        } else {
          console.log(`Adding ${title} to favorites`);
          return [...prevFavorites, title]; // Add title to favorites
        }
      });
    };
  
    const deleteNote = (id: number) => {
      const target = notes.find(note => note.id === id);
    
      if (target) {
        setFavorites(prevFavorites => prevFavorites.filter(title => title !== target.title));
      }
    
      setNotes(notes.filter(note => note.id !== id));
    };
  
    const updateNote = (id: number, field: keyof Note, value: string) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, [field]: value } : note
        )
      );
  
      if (field === "title") {
        setFavorites((prevFavorites) => {
          const target = notes.find((note) => note.id === id);
          if (target && prevFavorites.includes(target.title)) {
            // Replace the old title with the new one
            return prevFavorites.map((fav) => (fav === target.title ? value : fav));
          }
          return prevFavorites;
        });
      }
    };
  
    return (
      <div className='app-container'>
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })}
              required>
            </input>
          </div>
  
          <div>
            <textarea
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })}
              required>
            </textarea>
          </div>
  
          <div>
            <select
              onChange={(event) =>
                setCreateNote({ ...createNote, label: event.target.value as Label})}
              required>
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>
  
          <div><button type="submit">Create Note</button></div>
        </form>
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-item">
              <div className="notes-header">
                <button onClick={() => toggleFavorite(note.title)}>
                  {favorites.includes(note.title) ? '❤️' : '🤍'}
                </button>
                <button onClick={() => deleteNote(note.id)}>x</button>
              </div>
              <h2 
              contentEditable
              onBlur={(event) =>
                updateNote(note.id, "title", event.currentTarget.textContent || "")
              }> {note.title} </h2>
              <p 
              contentEditable
              onBlur={(event) =>
                updateNote(note.id, "content", event.currentTarget.textContent || "")
              }> {note.content} </p>
              <p 
              contentEditable
              onBlur={(event) =>
                updateNote(note.id, "label", event.currentTarget.textContent || Label.other)
              }> {note.label} </p>
            </div>
          ))}
        </div>
        <div className="fav-notes">
          <FavoriteNotes favorites={favorites}/>
        </div>
        <div className="click-counter">
          <ToggleTheme />
        </div>
     </div>
  
   );
}