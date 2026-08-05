import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PreferencesProvider } from './context/PreferencesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  </React.StrictMode>
);
