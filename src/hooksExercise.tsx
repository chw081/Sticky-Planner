import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from './themeContext';
import './App.css';

export function ClickCounter() {
  const [count, setCount] = useState(0);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div
      className="click-counter"
      style={{
        background: theme.background,
        color: theme.foreground,
      }}
    >
      <p>You clicked {count} times</p>
      <button
        className="click-button"
        style={{
          background: theme.foreground,
          color: theme.background,
        }}
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
    </div>
  );
}

function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => {
      if (prevTheme === themes.light) return themes.dark;
      if (prevTheme === themes.dark) return themes.morandi;
      return themes.light; // Cycles back to light
    });
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="toggle-theme">
        <button
          className="toggle-button"
          style={{
            background: currentTheme.foreground,
            color: currentTheme.background,
          }}
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
        <ClickCounter />
      </div>
    </ThemeContext.Provider>
  );
}

export default ToggleTheme;
