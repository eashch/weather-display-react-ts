import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherDisplay from './WeatherDisplay';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className='page'>
      <div className='display-window'>
        <WeatherDisplay />
      </div>
    </div>
  </React.StrictMode>
);