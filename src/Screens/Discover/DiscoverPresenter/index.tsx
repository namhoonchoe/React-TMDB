import React from "react";
import { Helmet } from "react-helmet";
import LoadingSpinner from "@components/LoadingSpinner";
import ErrorPopUp from "@components/ErrorPopUp";
import SideBar from "./SideBar";
import Main from "./Main";
import { GridItem, Box, Flex } from "@chakra-ui/react";
import { GridLayout } from "@components/Layout/BasicLayouts";

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
          <GridLayout mx="1%">
            <GridItem rowSpan={2} colSpan={1}>
              <Box position="sticky" top="10%">
                <SideBar />
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colSpan={5}>
              <Main />
            </GridItem>
          </GridLayout>
        </Flex>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default DiscoverPresenter;
