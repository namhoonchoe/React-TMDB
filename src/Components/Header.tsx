import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { Flex, 
        Spacer,
        Text,
        Heading,
        Drawer,
        DrawerBody,
        DrawerHeader,
        DrawerOverlay,
        DrawerContent,
        useDisclosure  } from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'

const Header:React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
  <>
    <Flex justify="flex-start" align="center" m={[3,2.5]}>
      <Flex direction="column" justify="center" px={5}>
        <HamburgerIcon onClick={onOpen} width={5} height={5}/>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"xs"}>
          <DrawerOverlay />
          <DrawerContent width="full">
            <DrawerHeader borderBottomWidth="1px" px="1rem">       
              <SearchBox/>
            </DrawerHeader>
            <DrawerBody px="1rem">
              <Flex direction="column" 
                    align="flex-start" 
                    justify="center"
                    width="fit-content">
                <Link to="/movie">
                  <Text fontSize="sm" pr={1}>Movies</Text>
                </Link>
                <Link to="/tv">
                  <Text fontSize="sm" pr={1}>TV</Text>
                </Link>
                <Link to="/tag">
                  <Text fontSize="sm" pr={1}>Tag</Text>
                </Link> 
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Link to="/">
        <Heading fontSize="lg" decoration="none" pr={1}>Kino guide</Heading>
      </Link>
    </Flex>
    <Spacer/>
  </>
  )
};

export default Header