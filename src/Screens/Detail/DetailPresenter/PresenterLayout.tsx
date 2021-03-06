import React from "react";
import { Helmet } from "react-helmet";
import { Flex, Fade } from "@chakra-ui/react";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import LoadingSpinner from "@components/LoadingSpinner";
import ErrorPopUp from "@components/ErrorPopUp";
import ScrollToTop from "@components/ScrollToTop";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";

interface IDetailProps {
  detail: DetailInfo;
  credits: CreditInfo;
  similarContents: Array<IMovieSimilar> | Array<ISeriesSimilar>;
  loading: boolean;
  error: boolean;
}

const PresenterLayout: React.FC<IDetailProps> = ({
  detail,
  credits,
  similarContents,
  error,
  loading,
}) => {
  const pathType = usePathTypeCheck();

  return (
    <>
      {loading ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              Kino Guide | {pathType === "movie" ? "Movie" : "Series"}
            </title>
          </Helmet>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <Flex direction="column" alignItems={"center"} justifyContent={"center"} mb={4}>
            <DetailHeader detail={detail} loading={loading} />
            <Fade in={loading === false}>
              <DetailBody
                detail={detail}
                similarContents={similarContents}
                credits={credits}
              />
            </Fade>
          </Flex>
          <ScrollToTop />
        </>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default PresenterLayout;
