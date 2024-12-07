// FavNotes.tsx
import React, { useState, useEffect } from 'react';
import { dummyNotesList } from './constant'; // Assuming you still have this import

export function FavoriteNotes() {
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

  // Log favorite titles whenever they change
  useEffect(() => {
    console.log("Current favorite titles:", favorites);
  }, [favorites]);

  return (
    <div className="fav-notes">
      <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button onClick={() => toggleFavorite(note.title)}>
                {favorites.includes(note.title) ? '❤️' : '🤍'} {/* Heart icons */}
              </button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>
      <div className="favorite-notes">
        <h3>Favorite Notes:</h3>
        <ul>
          {favorites.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}