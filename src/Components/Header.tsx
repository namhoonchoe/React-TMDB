import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { Flex,
        VStack,
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
    <Flex 
      justify="flex-start" 
      align="center" 
      m={"0"}
      p={[3,2.5]}
      zIndex={"10"} 
      position="relative"
      top={"0"}
      left={"0"}>
      <VStack justify="center" >
        <HamburgerIcon onClick={onOpen} width={5} height={5} mr={3} />
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"xs"} >
          <DrawerOverlay />
          <DrawerContent width="full" m={[3,2]} borderRadius="lg">
            <DrawerHeader borderBottomWidth="1px" px="1rem">       
              <SearchBox/>
            </DrawerHeader>
            <DrawerBody px={"1rem"}>
              <Flex direction="column" 
                    align="flex-start" 
                    justify="center"
                    width="fit-content">
                <Link to="/movie">
                  <Text fontSize="lg" pr={1}>Movies</Text>
                </Link>
                <Link to="/series">
                  <Text fontSize="lg" pr={1}>Series</Text>
                </Link>
                <Link to="/bookmark">
                  <Text fontSize="lg" pr={1}>BookMark</Text>
                </Link>
                <Link to="/discover/movie">
                  <Text fontSize="lg" pr={1}>Discover</Text>
                </Link>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </VStack>
      <Link to="/">
        <Heading fontSize="lg" decoration="none" pr={1}>Kino guide</Heading>
      </Link>
    </Flex>
    <Spacer/>
  </>
  )
};

export default Header