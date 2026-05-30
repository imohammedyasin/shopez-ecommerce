import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GeneralContextProvider from './context/GeneralContext';
import axios from 'axios';

// Configure Axios baseURL dynamically for local development vs production deployment
axios.defaults.baseURL = process.env.REACT_APP_API_URL || (window.location.port === '3000' ? 'http://localhost:6001' : '');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralContextProvider>
        <App />
      </GeneralContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
