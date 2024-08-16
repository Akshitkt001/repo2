import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Ensure that the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found. Please ensure you have a <div id='root'></div> in your HTML.");
}

// Create and render the React root
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance
reportWebVitals(console.log);
