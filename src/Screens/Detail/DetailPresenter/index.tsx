import React from 'react'
import { Flex } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"
import DetailHeader from './DetailHeader';
import DetailBody from './DetailBody';
import DetailFooter from './DetailFooter';

interface IDetailProps {
  detail:any
  cast:any
  similar:any
  loading:boolean
  error:boolean
}

const DetailPresenter:React.FC<IDetailProps> = ({ detail ,cast ,similar ,error, loading }) => {
  return (
    <>
      { loading 
      ? <LoadingSpinner/> 
      : (<Flex direction="column" align="center" justify="center">
          <DetailHeader 
            detail={detail} 
            cast={cast} />
          <DetailBody/>
          <DetailFooter/>
        </Flex>)
      }

      { error ? <p>"An error has occured"</p>: null }
    </>
  )
}



export default DetailPresenter