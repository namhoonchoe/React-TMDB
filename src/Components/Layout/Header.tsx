import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "../SearchBox";
import { Flex,
        VStack,
        Spacer,
        Text,
        Heading,
        Box,
        Tooltip,
        Drawer,
        DrawerBody,
        DrawerHeader,
        DrawerOverlay,
        DrawerContent,
        useDisclosure,
        useColorMode  } from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
import MovieIcon from "../svgcomponents/MovieIcon";
import SeriesIcon from "../svgcomponents/SeriesIcon";
import Collections from "../svgcomponents/CollectionsIcon";
import DiscoverIcon from "../svgcomponents/DiscoverIcon";
import DayLightMode from "../svgcomponents/DayLightMode";
import DarkMode from "../svgcomponents/DarkMode";

const Header:React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
  <>
    <Flex 
      justify="flex-start" 
      align="center"
      bgColor={ colorMode === "light" ? "gray.100" : "black" }
      opacity="0.9"
      pl={4} pr={8} py={3}  
      zIndex={"10"}
      position="sticky"
      width="100vw"
      top={0}
      left={0}>
      <VStack justify="center" >
        <HamburgerIcon onClick={onOpen} width={5} height={5} mr={3} />
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"xs"} >
          <DrawerOverlay />
          <DrawerContent width="full" m={3} borderRadius="lg">
            <DrawerHeader borderBottomWidth="1px" px="1rem">       
              <SearchBox/>
            </DrawerHeader>
            <DrawerBody px={"1rem"}>
              <Flex direction="column" 
                    align="flex-start" 
                    justify="center"
                    width="fit-content">
                <Link to="/movie">
                  <Flex align="center" my={1}>
                    <MovieIcon/>
                    <Text fontSize="xl" textColor="gray.600" fontWeight="hairline" ml={2}>Movies</Text>
                  </Flex>
                </Link>
                <Link to="/series">
                  <Flex align="center" my={1}>
                    <SeriesIcon/>
                    <Text fontSize="xl" textColor="gray.600" fontWeight="hairline" ml={2}>Series</Text>
                  </Flex>
                </Link>
                <Link to="/discover/movie">
                  <Flex align="center" my={1}>
                    <DiscoverIcon/>
                    <Text fontSize="xl" textColor="gray.600" fontWeight="hairline" ml={2}>Discover</Text>
                  </Flex>
                </Link>
                <Link to="/bookmark">
                  <Flex align="center" my={1}>
                    <Collections/>
                    <Text fontSize="xl" textColor="gray.600" fontWeight="hairline" ml={2}>Collections</Text>
                  </Flex>
                </Link>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </VStack>
      <Link to="/">
        <Tooltip label="Go back to Home" aria-label="A tooltip">
          <Heading fontSize="xl" fontWeight="semibold" decoration="none" pr={1}>Kino guide</Heading>
        </Tooltip>
      </Link>
      <Spacer/>
      { colorMode === "light" 
        ? <Tooltip label="Dark mode" aria-label="A tooltip">
            <Box onClick={toggleColorMode}>
              <DarkMode width="2rem" height="2rem"/>
            </Box>
          </Tooltip>
        : <Tooltip label="Light mode"  aria-label="A tooltip">
            <Box onClick={toggleColorMode}>
              <DayLightMode width="2rem" height="2rem"/>
            </Box>
          </Tooltip>  
      }
    </Flex>
  </>
  )
};

export default Header