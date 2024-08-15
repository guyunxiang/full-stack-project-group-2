import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from "react-toastify";

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="bottom-right" autoClose={3000} />
  </React.StrictMode>
);