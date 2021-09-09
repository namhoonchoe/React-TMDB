import React from "react";
import CollapseSection from "@components/Layout/CollapseSection"
import { VStack } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"
import ScrollToTop from "@components/ScrollToTop";

interface IMovieProps {
  nowPlaying:null|MovieData,
  upComing:null|MovieData,
  popular:null|MovieData,
  error:boolean,
  loading:boolean
}

const MoviePresenter:React.FC<IMovieProps> = ({ nowPlaying, upComing, popular, error, loading }) => {
  return (
	<>
    { loading ? <LoadingSpinner/> 
    : <> 
        <VStack spacing="3" width="90vw" mt={2}>
          { nowPlaying !== null && nowPlaying.length > 0 && 
            <>
            <CollapseSection
              title="NowPlaying"
              sectionInfos={nowPlaying}/>
            </>
          }

          { popular !== null && popular.length > 0 && 
          <CollapseSection 
            title="Popular Movies"
            sectionInfos={popular} /> 
          } 

          { upComing !== null && upComing.length > 0 && 
          <CollapseSection 
            title="UpComing Movies"
            sectionInfos={upComing}/> 
          }
        </VStack>
      {/* To the page top */}
      <ScrollToTop/>
      </>
    }

    { error ? <p>An error has occured</p>: null }
	</>
  )
};

export default MoviePresenter;
