import React, { createContext, useState, useEffect } from 'react';

// Create a new context for managing the current theme and the toggle function.
export const ThemeContext = createContext();

// The ThemeProvider component manages the theme state for the application.
export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  // Define a state variable 'theme' with an initial value 'light'.
  const [theme, setTheme] = useState(getInitialTheme);
  //include a state for the font selection 
  const [font, setFont] = useState('Inter');

    useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Optional: Watch for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // The toggleThem function allows us to toggle between 'light' and 'dark' themes.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  // changeFont function to change between fonts
  const changeFont = (newFont) => {
    setFont(newFont);
  };
  

  // Provide the current theme and toggle function to all child components.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, font, changeFont }}>
      {children}
    </ThemeContext.Provider>
  );
};
