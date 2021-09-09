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
import { useIconColor } from "@hooks/useIconColor";
import PersonIcon from "@components/svgcomponents/PersonIcon";
import MovieIcon from "../svgcomponents/MovieIcon";
import SeriesIcon from "../svgcomponents/SeriesIcon";
import Collections from "../svgcomponents/CollectionsIcon";
import DiscoverIcon from "../svgcomponents/DiscoverIcon";
import DayLightMode from "../svgcomponents/DayLightMode";
import DarkMode from "../svgcomponents/DarkMode";

const Header:React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const iconColor = useIconColor()

  return (
  <>
    <Flex 
      justify="flex-start" 
      align="center"
      bgColor={ colorMode === "light" ? "gray.100" : "black" }
      opacity="0.9"
      px={4} py={3}  
      position="sticky"
      zIndex="10"
      width="100%"
      top={0}
      left={0}>
      <VStack justify="start" >
        <HamburgerIcon onClick={onOpen} width={5} height={5} mr={3} />
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"xs"} >
          <DrawerOverlay />
          <DrawerContent m={3} borderRadius="lg">
            <DrawerHeader borderBottomWidth="1px" >       
              <SearchBox/>
            </DrawerHeader>
            <DrawerBody  >
              <Flex direction="column" 
                    align="start" 
                    justify="center">
                <Link to="/movie">
                  <Flex align="center" width="2xs" my={1} px={2} borderRadius="lg" _hover={{backgroundColor:colorMode === "light" ? "gray.200" : "gray.600" }}>
                    <MovieIcon color={iconColor}/>
                    <Text fontSize="xl"  fontWeight="hairline" ml={2}>Movies</Text>
                  </Flex>
                </Link>
                <Link to="/series">
                  <Flex align="center"  width="2xs" my={1} px={2} borderRadius="lg" _hover={{backgroundColor:colorMode === "light" ? "gray.200" : "gray.600" }}>
                    <SeriesIcon color={iconColor}/>
                    <Text fontSize="xl" fontWeight="hairline" ml={2}>Series</Text>
                  </Flex>
                </Link>
                <Link to="/person">
                  <Flex align="center"  width="2xs" my={1} px={2} borderRadius="lg" _hover={{backgroundColor:colorMode === "light" ? "gray.200" : "gray.600" }}>
                    <PersonIcon color={iconColor}/>
                    <Text fontSize="xl" fontWeight="hairline" ml={2}>Person</Text>
                  </Flex>
                </Link>
                <Link to="/discover/movie">
                  <Flex align="center"  width="2xs" my={1} px={2} borderRadius="lg" _hover={{backgroundColor:colorMode === "light" ? "gray.200" : "gray.600" }}>
                    <DiscoverIcon color={iconColor}/>
                    <Text fontSize="xl" fontWeight="hairline" ml={2}>Discover</Text>
                  </Flex>
                </Link>
                <Link to="/bookmark">
                  <Flex align="center"  width="2xs" my={1} px={2} borderRadius="lg" _hover={{backgroundColor:colorMode === "light" ? "gray.200" : "gray.600" }}>
                    <Collections color={iconColor}/>
                    <Text fontSize="xl" fontWeight="hairline" ml={2}>Collections</Text>
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