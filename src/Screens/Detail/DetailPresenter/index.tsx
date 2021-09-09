import React from 'react'
import { Flex, Fade } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"
import DetailHeader from './DetailHeader';
import DetailBody from './DetailBody';

interface IDetailProps {
  detail:any
  credits:any
  similar:any
  loading:boolean
  error:boolean
}

const DetailPresenter:React.FC<IDetailProps> = ({ detail ,credits ,similar ,error, loading }) => {
  return (
    <>
      { loading 
      ? <LoadingSpinner/> 
      : <Flex direction="column" align="center" justify="center" >        
          <DetailHeader detail={detail} loading={loading}/>
          <Fade in={loading === false}>
            <DetailBody detail={detail} similars={similar} credits={credits}/>
          </Fade>
        </Flex>
      }

      { error ? <p>An error has occured</p>: null }
    </>
  )
}



export default DetailPresenter