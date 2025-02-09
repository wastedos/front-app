"use client";
import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create a Context for the mode and setMode
export const ThemeModeContext = createContext();

export default function Theme({ children }) {
  const [mode, setMode] = useState(null); // Start with null to avoid defaulting to "light"

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("currentMode") || "light";
      setMode(storedMode); // Set the stored mode
    }
  }, []);

  useEffect(() => {
    if (mode) { // Ensure mode is not null
      localStorage.setItem("currentMode", mode);
    }
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode: mode || "light", // Use "light" if mode is null initially
      ...(mode === "light"
        ? {
            colors: {
              main: '#eeee',
              text: '#212121',
              commettext: '#616161',
              link: '#212121',
              commetlink: '#757575',
              card: '#ffffff',
              cardhover:'#cccc',
              box: '#f5f5f5',
            },
          }
        : {
            colors: {
              main: '#202020',
              text: '#fff', 
              commettext: '#e0e0e0',
              link: '#fff',
              commetlink: '#bdbdbd',
              card: '#606060',
              cardhover:'#525252',
              box: '#202020',
            },
          }
      ),
    },
  });

  if (mode === null) return null; // Prevent rendering until mode is set

  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
