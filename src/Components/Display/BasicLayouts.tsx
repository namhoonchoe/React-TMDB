import React from "react";
import { Flex, Grid, chakra } from "@chakra-ui/react";

export const CenteredBox = chakra(Flex, {
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export const PresenterLayout = chakra(Flex, {
  baseStyle: {
    flexDirection:"column",
    width: "90vw",
    height:"100%",
    mt: 2,
    mb:4
  },
});

export const GridLayout = chakra(Grid, {
  baseStyle: {
    width: "100%",
    gridTemplateRows: "repeat(2, 1fr)",
    gridTemplateColumns: "repeat(6, 1fr)",
  },
});

export const AutoGridLayoutSm = chakra(Grid, {
  baseStyle: {
    gridTemplateColumns: "repeat(auto-fill,minmax(10.5rem, 1fr))",
    gridColumnGap: "6",
    gridRowGap: "6",
    width: "100%",
  },
});
