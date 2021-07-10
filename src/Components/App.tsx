import React from "react";
import Router from "./Router"
import "focus-visible/dist/focus-visible"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../Styles"




const App:React.FC = () => {
  return (
  <>
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  </>
  ) 
}

export default App;
