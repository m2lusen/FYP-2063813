/**
 * Entry point of the React application.
 * Renders the root component wrapped in BrowserRouter.
 * @module index
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

/**
 * Root element where the React application is rendered.
 * @type {HTMLDivElement}
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Renders the root component inside BrowserRouter.
 */
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
);
