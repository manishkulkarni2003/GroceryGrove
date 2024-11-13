// index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Root } from './App'; // Import Root instead of App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root /> {/* Render Root to enable routing */}
  </StrictMode>
);
