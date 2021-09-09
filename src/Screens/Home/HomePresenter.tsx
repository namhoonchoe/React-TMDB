import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text, Box, VStack } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"
import LandingPortal from "@components/Layout/LandingPortal"
import InfoCard from "@components/Layout/InfoCard"

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
      : <VStack mb={3} width="100%" overscroll="none">
        { trendingMovies && trendingSeries !== null && trendingMovies.length && trendingSeries.length > 0 &&
        <Box width="100%" height="70vh"> 
          <LandingPortal
          trendingMovies={trendingMovies}
          trendingSeries={trendingSeries} 
          randomIndex={randomIndex}
          mediaType={mediaType}
          loading={loading}/>
        </Box> }

        { trendingMovies !== null && trendingMovies.length > 0 &&
        <VStack align="start">
          <Flex align="flex-end" my={4} >
            <Text fontSize="3xl" mr={2}>Today's Trending Movies</Text>
            <Text pb={1.5} fontWeight="semibold" fontSize="sm" >
              <Link to="/movie">
                Explore Movies
              </Link>
            </Text>
          </Flex>
          <Box width="96vw">
            <Flex width="100%" overflowX="scroll" height="fit-content" justify="start" align="start" 
              sx={{ '&::-webkit-scrollbar': {
                    borderRadius: '16px',
                    backgroundColor: `rgba(0, 0, 0, 0)`,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    scrollbarWidth: '2px',
                    borderRadius: '16px',
                    backgroundColor: `rgba(141,144, 150, 0.3)`,
                  },
                }}>
              {trendingMovies.map((data:any) => (
              <Link to={`/${"movie"}/${data.id}`} key={data.id}>
                <Box mx={3}>
                  <InfoCard
                    title={data.title||data.name}
                    posterPath={data.poster_path||data.profile_path}
                    rating={data.vote_average}/>
                </Box>
              </Link>))}
            </Flex>
          </Box>
        </VStack>
        }

        { trendingSeries !== null && trendingSeries.length > 0 &&
        <VStack align="start">
          <Flex align="flex-end" my={4} >
            <Text fontSize="3xl" mr={2}>Today's Trending Series</Text>
            <Text pb={1.5} fontWeight="semibold" fontSize="sm"> 
              <Link to="/series">Explore TvSeries</Link>
            </Text>
          </Flex>
          <Box width="96vw">
          <Flex width="100%" overflowX="scroll" height="fit-content"  justify="start" align="start" 
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: `rgba(141,144, 150, 0.3)`,
                  borderRadius: '24px',
                },
              }}> 
            {trendingSeries.map((data:any) => (
            <Link to={`/${"series"}/${data.id}`} key={data.id}>
              <Box mx={3}>
              <InfoCard
                title={data.title||data.name}
                posterPath={data.poster_path||data.profile_path}
                rating={data.vote_average}/>
              </Box>
            </Link>))}
          </Flex>
          </Box>
        </VStack>
        }

      </VStack>}
    { error ? <p>An error has occured</p>: null }
  </>
  )

};

export default HomePresenter;
