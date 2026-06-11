import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

document.documentElement.style.setProperty(
  '--lets-talk-bg-url',
  `url('${import.meta.env.BASE_URL}images/Lets talk_BG.jpg')`
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
