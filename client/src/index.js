import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import registerServiceWorker from './registerServiceWorker';
import { ActionCableProvider } from 'react-actioncable-provider';
const API_WS_ROOT = 'ws://localhost:3001/cable';

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <App />
  </ActionCableProvider>,
  document.getElementById("root")
);
//registerServiceWorker();
