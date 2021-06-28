import React from "react";
import Section from "../../Components/Section"
import { Flex } from "@chakra-ui/react"
import LoadingSpinner from "../../Components/LoadingSpinner"

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
	  <Flex direction="column" justify="center" ml={5} width="100vw" mb={5}>
      { loading 
      ?<LoadingSpinner/> 
      : null }

      { error ? <p>"An error has occured"</p>: null }

      { popular !== null && popular.length > 0 
      ? <Section 
        title={"Popular"}
        sectionInfos={popular}
        />
      :null
      }

      { nowPlaying !== null && nowPlaying.length > 0 
      ? <Section 
        title={"NowPlaying"}
        sectionInfos={nowPlaying}/>
      :null
      }
      
      { upComing !== null && upComing.length > 0 
      ? <Section 
      title={"UpComing"}
      sectionInfos={upComing}
      />
      :null
      }
      
	  </Flex>
  </>

  )
  
  
};

export default MoviePresenter;
