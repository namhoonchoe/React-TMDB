import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Flex, Text, Box, VStack } from "@chakra-ui/react";
import LoadingSpinner from "@components/LoadingSpinner";
import LandingPortal from "@components/Display/LandingPortal";
import InfoCard from "@components/Display/InfoCard";
import CarouselSlider from "@components/Display/CarouselSlider";
import ErrorPopUp from "@components/ErrorPopUp";

interface IHomeProps {
  trendingMovies: Array<IMovieData>;
  trendingSeries: Array<ISeriesData>;
  mediaType: string;
  randomIndex: number;
  error: boolean;
  loading: boolean;
}

const HomePresenter: React.FC<IHomeProps> = ({
  trendingMovies,
  trendingSeries,
  randomIndex,
  mediaType,
  error,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Kino Guide</title>
          </Helmet>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Kino Guide</title>
          </Helmet>
          <VStack mb={3} width="100%" overscroll="none">
            {trendingMovies.length && trendingSeries.length > 0 && (
              <Box width="100%" height="70vh">
                <LandingPortal
                  trendingMovies={trendingMovies}
                  trendingSeries={trendingSeries}
                  randomIndex={randomIndex}
                  mediaType={mediaType}
                  loading={loading}
                />
              </Box>
            )}

            {trendingMovies.length > 0 && (
              <VStack alignItems={"start"} >
                <Flex alignItems={"flex-end"} left={2}>
                  <Text fontSize="3xl" mr={2}>
                    Today's Trending Movies
                  </Text>
                  <Text pb={1.5} fontWeight="semibold" fontSize="sm">
                    <Link to="/movie">Explore Movies</Link>
                  </Text>
                </Flex>
                <Flex width="90vw" alignItems={"center"} justifyContent={"center"}> 
                  <CarouselSlider wrapperHeight={{lg:"50vh", xl: "40vh"}} buttonHeight={"15.4rem"}>
                    {trendingMovies.map((data: IMovieData) => (
                      <Link to={`/${"movie"}/${data.id}`} key={data.id}>
                        <Box mx={3}>
                          <InfoCard
                            title={data.title}
                            posterPath={data.poster_path}
                            rating={data.vote_average}
                          />
                        </Box>
                      </Link>
                    ))}
                  </CarouselSlider>
                </Flex>
              </VStack>
            )}

            {trendingSeries.length > 0 && (
              <VStack alignItems={"start"}>
                <Flex alignItems={"flex-end"} my={4}>
                  <Text fontSize={"3xl"} mr={2}>
                    Today's Trending Series
                  </Text>
                  <Text pb={1.5} fontWeight={"semibold"} fontSize="sm">
                    <Link to="/series">Explore TvSeries</Link>
                  </Text>
                </Flex>
                <Flex width={"90vw"} alignItems={"center"} justifyContent={"center"}>
                  <CarouselSlider wrapperHeight={{lg:"50vh", xl: "40vh"}} buttonHeight={"15.4rem"}>
                    {trendingSeries.map((data: ISeriesData) => (
                      <Link to={`/${"series"}/${data.id}`} key={data.id}>
                        <Box mx={3}>
                          <InfoCard
                            title={data.name}
                            posterPath={data.poster_path}
                            rating={data.vote_average}
                          />
                        </Box>
                      </Link>
                    ))}
                  </CarouselSlider>
                </Flex>
              </VStack>
            )}
          </VStack>
        </>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default HomePresenter;
