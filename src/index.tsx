import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Function to load a script dynamically
function loadScript(src: string, attributes: { [key: string]: string } = {}) {
  const script = document.createElement('script');
  script.src = src;
  Object.keys(attributes).forEach(key => {
    script.setAttribute(key, attributes[key]);
  });
  document.head.appendChild(script);
}

function initializeScripts() {
  loadScript('https://cdn.tailwindcss.com?plugins=forms,typography');
  // loadScript('https://unpkg.com/unlazy@0.11.3/dist/unlazy.with-hashing.iife.js', { defer: 'true', init: '' });
  // loadScript('https://cdn.jsdelivr.net/npm/chart.js');
}

// Initialize scripts
initializeScripts();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
