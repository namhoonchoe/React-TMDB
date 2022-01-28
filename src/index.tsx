import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./Style";
import { Provider } from "react-redux";
import store from "@redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom";
import App from "@components/App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
