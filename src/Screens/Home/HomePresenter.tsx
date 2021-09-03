import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text, Box, VStack } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"
import CarouseSlider from "@components/Layout/CarouseSlider";
import LandingPortal from "@components/Layout/LandingPortal"

interface IHomeProps {
  trendingMovies:null|HomeData
  trendingSeries:null|HomeData
  mediaType:string
  randomIndex:number
  error:boolean,
  loading:boolean
}

const HomePresenter:React.FC<IHomeProps> = ({ trendingMovies, trendingSeries, randomIndex, mediaType, error, loading }) => {
  return (
  <>
    { loading 
      ? <LoadingSpinner/> 
      : <VStack mb={3} overflowX="hidden">
        { trendingMovies && trendingSeries !== null && trendingMovies.length && trendingSeries.length > 0 &&
        <Box width="100vw" height="70vh"> 
          <LandingPortal
          trendingMovies={trendingMovies}
          trendingSeries={trendingSeries} 
          randomIndex={randomIndex}
          mediaType={mediaType}
          loading={loading}/>
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
          <Box width="96vw" align="center">
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
          <Box width="96vw" align="center">
            <CarouseSlider 
              carouselData={trendingSeries}
              dataType="series"
              imageType="poster"/>
          </Box>
        </VStack>
        }

      </VStack>}
    { error ? <p>An error has occured</p>: null }
  </>
  )

};

export default HomePresenter;
