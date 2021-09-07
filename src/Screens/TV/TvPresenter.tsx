import React from "react";
import CollapseSection from "@components/Layout/CollapseSection"
import { VStack } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"
import ScrollToTop from "@components/ScrollToTop";

interface ISerieseProps {
  topRated:null|SeriesData,
  airingToday:null|SeriesData,
  popular:null|SeriesData,
  error:boolean,
  loading:boolean
}

const TvPresenter:React.FC<ISerieseProps> = ({topRated,airingToday,popular,error,loading}) => {
  return (
  <>
    { loading 
      ?<LoadingSpinner/> 
      : <>
          <VStack spacing="3" width="90vw" mt={2}>
            { airingToday !== null && airingToday.length > 0 && 
            <CollapseSection 
              title={"Airing Today"}
              sectionInfos={airingToday}
            /> } 

            { popular !== null && popular.length > 0 && 
            <CollapseSection  
              title={"Popular Series"}
              sectionInfos={popular} 
            /> }   

            { topRated !== null && topRated.length > 0 && 
            <CollapseSection 
              title={"TopRated Series"}
              sectionInfos={topRated}
            /> } 
          </VStack> 
      {/* To the page top */}
      <ScrollToTop/>
      </>
    }
    
    { error ? <p>An error has occured</p>: null }
  </>
  )
};

export default TvPresenter;
