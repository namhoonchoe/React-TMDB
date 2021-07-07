import React from "react";
import { Provider } from 'react-redux';
import store from "./Redux/store"
import ReactDOM from "react-dom";
import App from "./Components/App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
