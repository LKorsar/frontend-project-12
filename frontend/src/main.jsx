import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './Slices/index.jsx';

/* export const socket = io('https://localhost:3000'); */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
