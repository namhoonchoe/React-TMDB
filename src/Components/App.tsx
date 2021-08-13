import React from "react";
import Router from "./Router"
import "focus-visible/dist/focus-visible"
import { ChakraProvider } from "@chakra-ui/react"
import customTheme from "../Style"

const App:React.FC = () => {
  return (
  <>
    <ChakraProvider theme={customTheme}>
      <Router />
    </ChakraProvider>
  </>
  ) 
}

export default App;
