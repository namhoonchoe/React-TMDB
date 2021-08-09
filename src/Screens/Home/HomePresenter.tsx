import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "@components/LoadingSpinner"
import CarouseSlider from "@components/CarouseSlider";
import { Flex, Text, Box, VStack } from "@chakra-ui/react"

interface IHomeProps {
  trendingMovies:null|HomeData,
  trendingSeries:null|HomeData,
  trendingPeople:null|HomeData,
  error:boolean,
  loading:boolean
}

const HomePresenter:React.FC<IHomeProps> = ({trendingMovies,trendingSeries,trendingPeople,error,loading}) => {
  return (
  <>
    { loading 
      ? <LoadingSpinner/> 
      : <VStack width="90vw" my={5}> 
        { trendingMovies !== null && trendingMovies.length > 0 
        ? <VStack align="start">
            <Flex align="flex-end" my={4} >
              <Text fontSize="3xl" mr={2}>Today's Trending Movies</Text>
              <Text py={1} >
                <Link to="/movie">
                  Explore Movies
                </Link>
              </Text>
            </Flex>
            <Box width="90vw" align="center">
              <CarouseSlider 
                carouselData={trendingMovies}
                carouselType="poster"/>
            </Box>
          </VStack>
        : null }

        { trendingSeries !== null && trendingSeries.length > 0 
        ? <VStack align="start">
            <Flex align="flex-end" my={4} >
              <Text fontSize="3xl" mr={2}>Today's Trending Series</Text>
              <Text py={1} > 
                <Link to="/series">Explore TvSeries</Link>
              </Text>
            </Flex>
            <Box width="90vw" align="center">
              <CarouseSlider 
                carouselData={trendingSeries}
                carouselType="poster"/>
            </Box>
          </VStack>
        : null }

        { trendingPeople !== null && trendingPeople.length > 0 
        ? <VStack align="start">
            <Flex align="flex-end" my={4}>
              <Text fontSize="3xl" mr={2}>Today's Trending People</Text>
              <Text py={1}> 
                <Link to="/person">
                  Explore People
                </Link>
              </Text>
            </Flex>
            <Box width="90vw" align="center">
              <CarouseSlider 
                carouselData={trendingPeople}
                carouselType="portrait"/>
            </Box>
          </VStack>
        : null }
      </VStack>}
    { error ? <p>An error has occured</p>: null }
  </>
  )

};

export default HomePresenter;
