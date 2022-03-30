import React from "react";
import { Helmet } from "react-helmet";
import Section from "@components/Display/Section";
import { VStack } from "@chakra-ui/react";
import LoadingSpinner from "@components/LoadingSpinner";
import ErrorPopUp from "@components/ErrorPopUp";

interface ISearchProps {
  movieResults: Array<ISearchMovies>;
  seriesResults: Array<ISearchSeries>;
  loading: boolean;
  error: boolean;
}

const SearchPresenter: React.FC<ISearchProps> = ({
  movieResults,
  seriesResults,
  loading,
  error,
}) => {
  return (
    <>
      {loading ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Kino Guide | Search</title>
          </Helmet>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <VStack spacing="8" width="90vw">
            { movieResults.length > 0 && (
              <Section
                title={"Results for Movies"}
                sectionInfos={movieResults}
                sectionInfoType="movie"
              />
            )}

            {seriesResults.length > 0 && (
              <Section
                title={"Results for series"}
                sectionInfos={seriesResults}
                sectionInfoType="series"
              />
            )}
          </VStack>
        </>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default SearchPresenter;
