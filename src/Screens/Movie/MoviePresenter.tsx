import React from "react";
import Section from "@components/Section"
import { Flex } from "@chakra-ui/react"
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
    { loading ?<LoadingSpinner/> : null }

    { error ? <p>"An error has occured"</p>: null }

    { popular !== null && popular.length > 0 
    ? <Section  
        title={"Popular"}
        imageType="poster" 
        sectionInfos={popular} 
      />
    :null
    }

    { nowPlaying !== null && nowPlaying.length > 0 
    ? <Section 
        title={"NowPlaying"}
        imageType="poster"
        sectionInfos={nowPlaying}
      />
    :null
    }
    
    { upComing !== null && upComing.length > 0 
    ? <Section 
        title={"upComing"}
        imageType="poster"
        sectionInfos={upComing}
      />
    :null
    }
	</>
  )
};

export default MoviePresenter;
