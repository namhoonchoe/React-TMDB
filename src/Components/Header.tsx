import { Link,/* useLocation */} from "react-router-dom";
import SearchBox from "./SearchBox";
import { Flex, Spacer,Text,Box, Heading } from "@chakra-ui/react"


/*interface Path {
  current:boolean
}*/

const Header:React.FC = () => {
 // const path =  useLocation().pathname

  return (
  <>
    <Box display="flex" alignItems="center" mx={5} mt={2.5} >
      <Flex justify="flex-start" align="center" >
        <Link to="/">
          <Heading fontSize="md" decoration="none" pr={1} >Kino guide</Heading>
        </Link>
        <Link to="/movie">
          <Text fontSize="lg" pr={1}>Movies</Text>
        </Link>
        <Link to="/tv">
          <Text fontSize="lg" pr={1}>TV</Text>
        </Link>
        <Link to="/tag">
          <Text fontSize="lg" pr={1}>Tag</Text>
        </Link>
      </Flex>
      <Spacer/>
      <Box> 
        <SearchBox/>
      </Box>
    </Box>
  </>
  )
};

export default Header