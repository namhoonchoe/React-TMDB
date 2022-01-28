import React from "react";
import { Helmet } from "react-helmet";
import LoadingSpinner from "@components/LoadingSpinner";
import ErrorPopUp from "@components/ErrorPopUp";
import SideBar from "./SideBar";
import Main from "./Main";
import { Grid, GridItem, Box, Flex } from "@chakra-ui/react";

interface IDiscoverProps {
  loading: boolean;
  error: boolean;
}

const DiscoverPresenter: React.FC<IDiscoverProps> = ({ loading, error }) => {
  return (
    <>
      {loading ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Kino Guide | Discover</title>
          </Helmet>
          <LoadingSpinner />
        </>
      ) : (
        <Flex position="relative" width="100%">
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            width="100%"
            mx="1%"
          >
            <GridItem rowSpan={2} colSpan={1}>
              <Box position="sticky" top="10%">
                <SideBar />
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colSpan={4}>
              <Main />
            </GridItem>
          </Grid>
        </Flex>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default DiscoverPresenter;
