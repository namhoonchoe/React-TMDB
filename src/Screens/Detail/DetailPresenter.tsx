import React from "react";
import { Flex } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"

interface IDetailProps {
  detail:null|DetailData
  cast:null|DetailData
  similar:null|DetailData
  loading:undefined|boolean
  error:undefined|boolean
}

const DetailPresenter:React.FC<IDetailProps> = ({ detail,cast,similar,error,loading }) => {
  return(
  <>
    <Flex direction="column" justify="center" ml={5} width="100vw" mb={5}>
    { loading 
    ?<LoadingSpinner/> 
    : null }

    { error ? <p>"An error has occured"</p>: null }

	</Flex>
  </>
  )
};

export default DetailPresenter;
