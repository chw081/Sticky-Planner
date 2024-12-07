// FavoriteNotes.tsx
import React from 'react';

interface FavoriteNotesProps {
  favorites: string[];
}

export function FavoriteNotes({ favorites }: FavoriteNotesProps) {
  return (
    <div className="favorite-notes">
      <h3>List of favorites:</h3>
        {favorites.length > 0 ? (
          favorites.map((title, index) => <p key={index}>{title}</p>)
        ) : (
          <p>No favorite notes yet.</p>
        )}
    </div>
  );
}