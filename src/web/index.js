import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import io from "socket.io-client";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

let socket = io('http://localhost:5000');
socket.on('connect', () => {
  socket.emit('create_room')
  socket.emit('set_timer', '1234', '232323');
  socket.emit('custom', "232346");
  // socket.emit('set_timer', "2323");
});

socket.on('timer_changed', (msg) => {
  console.log('set timer to: ' + msg);
});

