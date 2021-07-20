import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "@components/LoadingSpinner"
import Carousel from "@components/Carousel";
import { Flex,Text } from "@chakra-ui/react"

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
	<Flex direction="column" justify="center" ml={5} width="100vw" my={5}>
    { loading 
      ? <LoadingSpinner/> 
      : null }
    { error ? <p>"An error has occured"</p>: null }
    
    { trendingMovies !== null && trendingMovies.length > 0 
      ? <>
        <Flex direction="column" justify="center" ml={5} width="100vw" mb={5}>
          <Flex align="flex-end" >
            <Text fontSize="3xl" mr={2}>Today's Trending Movies</Text>
            <Text py={1} >
              <Link to="/movie">
                Explore Movies
              </Link>
            </Text>
          </Flex>
          <Carousel carouselData={trendingMovies}/>
        </Flex>
        </>
      : null
    }

    { trendingSeries !== null && trendingSeries.length > 0 
      ? <>
        <Flex direction="column" justify="center" ml={5} width="100vw" mb={5}>
          <Flex align="flex-end" >
            <Text fontSize="3xl" mr={2}>Today's Trending Series</Text>
            <Text py={1} > 
              <Link to="/tv">Explore TvSeries</Link>
            </Text>
          </Flex>
          <Carousel carouselData={trendingSeries}/>
        </Flex>
        </>
      : null
    }
    
    { trendingPeople !== null && trendingPeople.length > 0 
      ? <>
        <Flex direction="column" justify="center" ml={5} width="100vw" mb={5}>
          <Flex align="flex-end" >
            <Text fontSize="3xl" mr={2}>Today's Trending People</Text>
            <Text py={1}> 
              <Link to="/person">
                Explore People
              </Link>
            </Text>
        </Flex>
          <Carousel carouselData={trendingPeople}/>
        </Flex>
        </>
      : null
    }
  </Flex>
  </>
  )

};

export default HomePresenter;
