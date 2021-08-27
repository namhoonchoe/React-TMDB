import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text, Box, VStack } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"
import CarouseSlider from "@components/CarouseSlider";
import LandingPortal from "@components/LandingPortal"

interface IHomeProps {
  trendingMovies:null|HomeData,
  trendingSeries:null|HomeData,
  trendingPeople:null|HomeData,
  error:boolean,
  loading:boolean
}

const HomePresenter:React.FC<IHomeProps> = ({ trendingMovies, trendingSeries, trendingPeople, error, loading }) => {
  return (
  <>
    { loading 
      ? <LoadingSpinner/> 
      : <VStack mb={3}>
        { trendingMovies && trendingSeries !== null && trendingMovies.length && trendingSeries.length > 0 &&
        <Box width="92vw" height="60vh"> 
          <LandingPortal 
          trendingMovies={trendingMovies}
          trendingSeries={trendingSeries}/>
        </Box>
        }

        { trendingMovies !== null && trendingMovies.length > 0 &&
        <VStack align="start">
          <Flex align="flex-end" my={4} >
            <Text fontSize="3xl" mr={2}>Today's Trending Movies</Text>
            <Text py={1} >
              <Link to="/movie">
                Explore Movies
              </Link>
            </Text>
          </Flex>
          <Box width="92vw" align="center">
            <CarouseSlider 
              carouselData={trendingMovies}
              dataType="movie"
              imageType="poster"/>
          </Box>
        </VStack>
        }

        { trendingSeries !== null && trendingSeries.length > 0 &&
        <VStack align="start">
          <Flex align="flex-end" my={4} >
            <Text fontSize="3xl" mr={2}>Today's Trending Series</Text>
            <Text py={1} > 
              <Link to="/series">Explore TvSeries</Link>
            </Text>
          </Flex>
          <Box width="92vw" align="center">
            <CarouseSlider 
              carouselData={trendingSeries}
              dataType="series"
              imageType="poster"/>
          </Box>
        </VStack>
        }

        { trendingPeople !== null && trendingPeople.length > 0 &&
        <VStack align="start">
          <Flex align="flex-end" my={4}>
            <Text fontSize="3xl" mr={2}>Today's Trending People</Text>
            <Text py={1}> 
              <Link to="/person">
                Explore People
              </Link>
            </Text>
          </Flex>
          <Box width="92vw" align="center">
            <CarouseSlider 
              carouselData={trendingPeople}
              dataType="person"
              imageType="portrait"/>
          </Box>
        </VStack>
        }
      </VStack>}
    { error ? <p>An error has occured</p>: null }
  </>
  )

};

export default HomePresenter;
