import React from "react";
import Section from "@components/Section"
import { Flex } from "@chakra-ui/react"
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
    <Flex direction="column" justify="center" ml={5} width="100vw" mb={5}>
      { loading 
      ?<LoadingSpinner/> 
      : null }
      
      { error ? <p>"An error has occured"</p>: null }

      { popular !== null && popular.length > 0 
      ? <Section 
        title={"Popular"}
        imageType="poster" 
        sectionInfos={popular}
        />
      :null
      }

      { airingToday !== null && airingToday.length > 0 
      ? <Section 
        title={"AiringToday"}
        imageType="poster" 
        sectionInfos={airingToday}/>
      :null
      }

      { topRated !== null && topRated.length > 0 
      ? <Section 
      title={"TopRated"}
      imageType="poster" 
      sectionInfos={topRated}
      />
      :null
      }
	  </Flex>
  </>
  )
};

export default TvPresenter;
