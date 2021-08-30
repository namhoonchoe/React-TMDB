import React from 'react'
import { Flex, Fade } from "@chakra-ui/react"
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
      : <Flex direction="column" align="center" justify="center">
          <Fade in={loading === false} >
            <DetailHeader detail={detail} />
          </Fade>
          <Fade in={loading === false} >
            <DetailBody/>
          </Fade>
          <Fade in={loading === false} >
            <DetailFooter/>
          </Fade>
        </Flex>
      }

      { error ? <p>An error has occured</p>: null }
    </>
  )
}



export default DetailPresenter