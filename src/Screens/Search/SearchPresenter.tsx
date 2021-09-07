import React from "react";
import Section from "@components/Layout/Section"
import { VStack } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"

interface ISearchpProps {
  movieResults:null|SearchData,
  seriesResults:null|SearchData,
  loading:boolean,
  error:boolean
}

const SearchPresenter:React.FC<ISearchpProps> = ({ movieResults,seriesResults,loading,error }) => {
  return(
  <> 
    { loading 
    ? <LoadingSpinner/> 
    : <VStack spacing="8" width="90vw" >
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
    }

    { error ? <p>An error has occured</p>: null }
  </>
  )
};

export default SearchPresenter;
