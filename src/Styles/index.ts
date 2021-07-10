import { extendTheme } from "@chakra-ui/react"
import "@fontsource/open-sans"
import "@fontsource/ubuntu"


const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
  },
  fonts: {
    body:"Ubuntu",
    heading: "Open Sans",
  }
  
});

export default theme