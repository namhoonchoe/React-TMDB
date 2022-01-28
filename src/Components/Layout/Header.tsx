import React from "react";
import { Link } from "react-router-dom";
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
import PersonIcon from "@components/svgcomponents/PersonIcon";
import MovieIcon from "../svgcomponents/MovieIcon";
import SeriesIcon from "../svgcomponents/SeriesIcon";
import Collections from "../svgcomponents/CollectionsIcon";
import DiscoverIcon from "../svgcomponents/DiscoverIcon";
import DayLightMode from "../svgcomponents/DayLightMode";
import DarkMode from "../svgcomponents/DarkMode";

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = useIconColor();

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
      left: "0"
    },
  });

  const NavigationBox = chakra(Flex, {
    baseStyle: {
      flexDirection:"column",
      alignItems: "center",
      justifyContent:"center",
    },
  });

  const NavigationItem = chakra(Flex, {
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
                  <NavigationItem>
                    <MovieIcon color={iconColor} />
                    <NavigationText>Movies</NavigationText>
                  </NavigationItem>
                </Link>
                <Link to="/series">
                  <NavigationItem>
                    <SeriesIcon color={iconColor} />
                    <NavigationText>Series</NavigationText>
                  </NavigationItem>
                </Link>
                <Link to="/person">
                  <NavigationItem>
                    <PersonIcon color={iconColor} />
                    <NavigationText>Person</NavigationText>
                  </NavigationItem>
                </Link>
                <Link to="/discover/movie">
                  <NavigationItem>
                    <DiscoverIcon color={iconColor} />
                    <NavigationText>Discover</NavigationText>
                  </NavigationItem>
                </Link>
                <Link to="/bookmark">
                  <NavigationItem>
                    <Collections color={iconColor} />
                    <NavigationText>Collections</NavigationText>
                  </NavigationItem>
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
