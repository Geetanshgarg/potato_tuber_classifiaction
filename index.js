import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n'; // Import the i18n configuration
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
