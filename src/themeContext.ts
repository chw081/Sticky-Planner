// ThemeContext.ts
import React from 'react';

export const themes = {
  light: {
    foreground: '#4d4d4d', // Neutral dark gray for text
    background: '#f0ebe4', // Soft cream for background
  },
  dark: {
    foreground: '#f0ebe4', // Soft cream for text
    background: '#4d4d4d', // Neutral dark gray for background
  },
  morandi: {
    foreground: '#a69cac', // Muted lavender for text
    background: '#f7f4f0', // Light cream for background
  },
};

export const ThemeContext = React.createContext(themes.light);
