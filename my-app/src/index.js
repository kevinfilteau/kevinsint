import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import './styles/buttons.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Include font imports
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Quicksand&family=DM+Serif+Text:ital@0;1&family=VT323&display=swap';
document.head.appendChild(link);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
