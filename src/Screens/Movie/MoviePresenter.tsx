import React from "react";
import Section from "@components/Section"
import { Box, VStack } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"

interface IMovieProps {
  nowPlaying:null|MovieData,
  upComing:null|MovieData,
  popular:null|MovieData,
  error:boolean,
  loading:boolean
}

const MoviePresenter:React.FC<IMovieProps> = ({nowPlaying,upComing,popular,error,loading}) => {
  return (
	<>
    { loading ? <LoadingSpinner/> 
    : <VStack spacing="8" width="95%" align="center">
        <Box>
          { popular !== null && popular.length > 0 
          ? <Section  
              title={"Popular"}
              sectionInfos={popular} 
            />  
          :null} </Box>
        <Box>
          { nowPlaying !== null && nowPlaying.length > 0 
          ? <Section 
              title={"NowPlaying"}
              sectionInfos={nowPlaying}
            />
          :null } </Box>
        <Box>
          { upComing !== null && upComing.length > 0 
          ? <Section 
              title={"upComing"}
              sectionInfos={upComing}
            />
        :null } </Box>
      </VStack> 
    }

    { error ? <p>"An error has occured"</p>: null }

    
	</>
  )
};

export default MoviePresenter;
