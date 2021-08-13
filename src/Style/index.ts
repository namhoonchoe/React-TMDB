import { extendTheme } from "@chakra-ui/react"
import "@fontsource/open-sans"
import "@fontsource/ubuntu"

const customTheme = extendTheme({
  config:{
    initialColorMode:"light",
    useSystemColorMode: false,  
  }, 

  fonts: {
    body:"Ubuntu",
    heading: "Open Sans",
  }
  
});

export default customTheme