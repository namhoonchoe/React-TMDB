import React from "react";
import { Provider } from 'react-redux';
import store from "@redux/store"
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom";
import App from "@components/App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
