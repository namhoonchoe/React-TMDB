import React from "react";
import Router from "./Router"
import { ChakraProvider } from "@chakra-ui/react"

import GlobalStyles from "../Styles/GlobalStyles"

function App() {
  return <>
  <ChakraProvider>
    <Router />
    <GlobalStyles />
  </ChakraProvider>
  </>
}

export default App;
