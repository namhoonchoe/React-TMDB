import React from 'react'
import { Helmet } from "react-helmet";
import { Flex, Fade } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import LoadingSpinner from "@components/LoadingSpinner"
import ErrorPopUp from "@components/ErrorPopUp"
import ScrollToTop from '@components/ScrollToTop';
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
  const pathType = usePathTypeCheck()

  return (
    <>
      { loading 
      ? <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Kino Guide | {pathType === "movie" ? "Movie" : "Series"}</title>
          </Helmet>
          <LoadingSpinner/> 
        </>
      : <>
        <Flex direction="column" align="center" justify="center" >        
          <DetailHeader detail={detail} loading={loading}/>
          <Fade in={loading === false}>
            <DetailBody detail={detail} similars={similar} credits={credits}/>
          </Fade>
        </Flex>
        <ScrollToTop/>
        </>
      }

    { error ? <ErrorPopUp/> : null }
    </>
  )
}



export default DetailPresenter