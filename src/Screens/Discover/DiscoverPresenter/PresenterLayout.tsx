import React from "react";
import { Helmet } from "react-helmet";
import LoadingSpinner from "@components/LoadingSpinner";
import ErrorPopUp from "@components/ErrorPopUp";
import SideBar from "./SideBar";
import Main from "./Main";
import { Flex } from "@chakra-ui/react";
import Header from "./Header"


interface IDiscoverProps {
  loading: boolean;
  error: boolean;
}

const PresenterLayout: React.FC<IDiscoverProps> = ({ loading, error }) => {
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
        <Flex flexDirection={"column"} width={"92vw"} >
          <Header/>
          <Main />
        </Flex>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default PresenterLayout;
