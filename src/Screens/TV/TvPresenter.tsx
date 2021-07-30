import React from "react";
import Section from "@components/Section"
import { VStack, Box } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"

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
      : <VStack spacing="8" width="100%" >
          <Box>
            { popular !== null && popular.length > 0 
            ? <Section  
                title={"Popular"}
                sectionInfos={popular} 
              />  
            :null} </Box>
          <Box>
            { airingToday !== null && airingToday.length > 0 
            ? <Section 
                title={"Airing Today"}
                sectionInfos={airingToday}
              />
            :null } </Box>
          <Box>
            { topRated !== null && topRated.length > 0 
            ? <Section 
                title={"TopRated"}
                sectionInfos={topRated}
              />
          :null } </Box>
        </VStack> }
      
      { error ? <p>"An error has occured"</p>: null }
  </>
  )
};

export default TvPresenter;
