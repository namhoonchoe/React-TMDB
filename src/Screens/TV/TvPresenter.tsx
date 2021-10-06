import React from "react";
import { Helmet } from "react-helmet"
import CollapseSection from "@components/Layout/CollapseSection"
import { VStack } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"
import ScrollToTop from "@components/ScrollToTop";
import ErrorPopUp from "@components/ErrorPopUp"

interface ISerieseProps {
  topRated:null|Array<any>,
  airingToday:null|Array<any>,
  popular:null|Array<any>,
  error:boolean,
  loading:boolean
}

const TvPresenter:React.FC<ISerieseProps> = ({topRated,airingToday,popular,error,loading}) => {
  return (
  <>
    { loading 
      ? <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Kino Guide | Series</title>
        </Helmet>
        <LoadingSpinner/> 
        </>
      : <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Kino Guide | Series</title>
        </Helmet>
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
    
    { error ? <ErrorPopUp/>: null }
  </>
  )
};

export default TvPresenter;
