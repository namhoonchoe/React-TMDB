import React from "react";
import Section from "@components/Section"
import { VStack } from "@chakra-ui/react"
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
    : <VStack spacing="8" width="100%" >
        { popular !== null && popular.length > 0 
        ? <Section  
            title={"Popular"}
            sectionInfos={popular} 
          />  
        :null }

        { nowPlaying !== null && nowPlaying.length > 0 
        ? <Section 
            title={"NowPlaying"}
            sectionInfos={nowPlaying}
          />
        :null }
        
        { upComing !== null && upComing.length > 0 
        ? <Section 
            title={"UpComing"}
            sectionInfos={upComing}
          />
        :null } 
      </VStack> }

    { error ? <p>"An error has occured"</p>: null }

    
	</>
  )
};

export default MoviePresenter;
