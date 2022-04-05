import React from "react";
import { IconButton, chakra, Flex, Text, useColorMode } from "@chakra-ui/react";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import { Link } from "react-router-dom";
import { useIconColor } from "@hooks/useIconColor";
import { MovieIcon, SeriesIcon } from "@components/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
import Filter from "./Filter";

export default function Header() {
  const path = usePathTypeCheck();
  
  const Title = chakra(Text, {
    baseStyle: {
      fontSize: "2xl",
      mb: 3,
      fontWeight: "semibold",
      position:"absolute",
      left:5
    },
  });



  return (
    <Flex
      width={"100%"}
      height={"10vh"}
      alignItems={"center"}
      position={"relative"}
    >
      <Title>Discover {path === "series" ? "Series" : "Movies"}</Title>
      <Filter />
    </Flex>
  );
}
