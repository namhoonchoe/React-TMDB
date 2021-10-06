import React from "react";
import { Helmet } from "react-helmet";
import Section from "@components/Layout/Section"
import { VStack } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"
import ErrorPopUp from "@components/ErrorPopUp"

interface ISearchpProps {
  movieResults:null|Array<any>,
  seriesResults:null|Array<any>,
  loading:boolean,
  error:boolean
}

const SearchPresenter:React.FC<ISearchpProps> = ({ movieResults,seriesResults,loading,error }) => {
  return(
  <> 
    { loading 
    ? <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Kino Guide | Search</title>
        </Helmet>
        <LoadingSpinner/> 
      </>
    : <>
        <VStack spacing="8" width="90vw" >
          { movieResults !== null && movieResults.length > 0 && 
          <Section  
            title={"Results for Movies"}
            sectionInfos={movieResults}
            sectionInfoType="movie"
          /> }   
  
          { seriesResults !== null && seriesResults.length > 0 && 
          <Section 
            title={"Results for series"}
            sectionInfos={seriesResults}
            sectionInfoType="series"
          /> } 
        </VStack> 
      </>
    }

    { error ? <ErrorPopUp/> : null }
  </>
  )
};

export default SearchPresenter;
