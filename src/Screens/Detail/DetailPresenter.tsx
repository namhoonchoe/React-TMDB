import React from "react";
import { Flex, Container, VStack, HStack, Box  } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"

interface IDetailProps {
  detail:any
  cast:any
  similar:any
  loading:boolean
  error:boolean
}

const DetailPresenter:React.FC<IDetailProps> = ({ detail ,cast ,similar ,error,loading }) => {
  return(
  <>
    { loading 
    ?<LoadingSpinner/> 
    : (
      <>
      <VStack>
        <Box
          opacity={"0.1"}
          width={"100vw"}
          height={"50vh"}
          bgSize="cover"
          bgImage = {
            detail.backdrop_path !== null 
            ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
            : "none" }
          bgPosition="top"
          bgRepeat="no-repeat"
        >


        </Box>
        

      </VStack>
      </>
    ) }

    { error ? <p>"An error has occured"</p>: null }
	</>
  )
};

export default DetailPresenter;
