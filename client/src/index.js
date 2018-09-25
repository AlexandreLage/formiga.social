import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import registerServiceWorker from './registerServiceWorker';
import { ActionCableProvider } from 'react-actioncable-provider';
const API_WS_ROOT = 'ws://quiet-earth-27482.herokuapp.com/cable';

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <App />
  </ActionCableProvider>,
  document.getElementById("root")
);
//registerServiceWorker();
