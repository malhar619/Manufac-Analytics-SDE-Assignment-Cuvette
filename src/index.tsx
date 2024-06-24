// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { MantineProvider } from '@mantine/core';
import App from './App';
import './index.css';



// Wrap your App with MantineProvider
ReactDOM.render(
  <React.StrictMode>
    <MantineProvider >
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
