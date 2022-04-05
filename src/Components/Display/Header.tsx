import React, { useEffect } from "react";
import { Link, useMatch, useLocation } from "react-router-dom";
import SearchBox from "../SearchBox";
import {
  Flex,
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
  useColorMode,
  chakra,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useIconColor } from "@hooks/useIconColor";
import { PersonIcon, MovieIcon, SeriesIcon, Collections, DiscoverIcon, DayLightMode, DarkMode } from "@components/SvgIcons"


const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = useIconColor();
  const matchMovie = useMatch("/movie");
  const matchSeries = useMatch("/series");
  const matchPerson = useMatch("/person");
  const matchDiscover = useMatch("/discover/movie");
  const matchCollections = useMatch("/bookmark");
  let location = useLocation().pathname

  const HeaderLayout = chakra(Flex, {
    baseStyle: {
      justifyContent: "flex-start",
      alignItems: "center",
      bgColor: colorMode === "light" ? "gray.100" : "black",
      opacity: "0.9",
      px: "4",
      py: "3",
      position: "sticky",
      zIndex: "10",
      width: "100%",
      top: "0",
      left: "0",
    },
  });

  const NavigationBox = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const NavigationContainer = chakra(Flex, {
    baseStyle: {
      alignItems: "center",
      width: "2xs",
      my: "1",
      px: "2",
      borderRadius: "lg",
      _hover: {
        backgroundColor: colorMode === "light" ? "gray.200" : "gray.600",
      },
    },
  });

  const NavigationText = chakra(Text, {
    baseStyle: {
      fontSize: "xl",
      fontWeight: "hairline",
      ml: "2",
    },
  });

  interface INavigation {
    destination: string;
    isSelected: boolean;
  }

  const Navigation: React.FC<INavigation> = ({ destination, isSelected }) => {
    return (
      <NavigationContainer>
        {destination === "Movies" && (
          <MovieIcon color={matchMovie !== null ? "#2D8FE6" : iconColor} />
        )}
        {destination === "Series" && (
          <SeriesIcon color={matchSeries !== null ? "#2D8FE6" : iconColor} />
        )}
        {destination === "Person" && (
          <PersonIcon color={matchPerson !== null ? "#2D8FE6" : iconColor} />
        )}
        {destination === "Discover" && (
          <DiscoverIcon
            color={matchDiscover !== null ? "#2D8FE6" : iconColor}
          />
        )}
        {destination === "Collections" && (
          <Collections
            color={matchCollections !== null ? "#2D8FE6" : iconColor}
          />
        )}
        <NavigationText color={isSelected ? "#2D8FE6" : iconColor}>
          {destination}
        </NavigationText>
      </NavigationContainer>
    );
  };


  useEffect(() => {
    let mounted = true
    onClose()
    return () => {
      mounted = false
    }
  }, [location])
  

  return (
    <HeaderLayout>
      <VStack justify="start">
        <HamburgerIcon onClick={onOpen} width={5} height={5} mr={3} />
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"xs"}>
          <DrawerOverlay />
          <DrawerContent m={3} borderRadius="lg">
            <DrawerHeader borderBottomWidth="1px">
              <SearchBox />
            </DrawerHeader>
            <DrawerBody>
              <NavigationBox>
                <Link to="/movie">
                  <Navigation
                    destination={"Movies"}
                    isSelected={matchMovie !== null ? true : false}
                  />
                </Link>
                <Link to="/series">
                  <Navigation
                    destination={"Series"}
                    isSelected={matchSeries !== null ? true : false}
                  />
                </Link>
                <Link to="/person">
                  <Navigation
                    destination={"Person"}
                    isSelected={matchPerson !== null ? true : false}
                  />
                </Link>
                <Link to="/discover/movie">
                  <Navigation
                    destination={"Discover"}
                    isSelected={matchDiscover !== null ? true : false}
                  />
                </Link>
                <Link to="/bookmark">
                  <Navigation
                    destination={"Collections"}
                    isSelected={matchCollections !== null ? true : false}
                  />
                </Link>
              </NavigationBox>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </VStack>
      <Link to="/">
        <Tooltip label="Go back to Home" aria-label="A tooltip">
          <Heading fontSize="xl" fontWeight="semibold" decoration="none" pr={1}>
            Kino guide
          </Heading>
        </Tooltip>
      </Link>
      <Spacer />
      {colorMode === "light" ? (
        <Tooltip label="Dark mode" aria-label="A tooltip">
          <Box onClick={toggleColorMode}>
            <DarkMode width="2rem" height="2rem" />
          </Box>
        </Tooltip>
      ) : (
        <Tooltip label="Light mode" aria-label="A tooltip">
          <Box onClick={toggleColorMode}>
            <DayLightMode width="2rem" height="2rem" />
          </Box>
        </Tooltip>
      )}
    </HeaderLayout>
  );
};

export default Header;
