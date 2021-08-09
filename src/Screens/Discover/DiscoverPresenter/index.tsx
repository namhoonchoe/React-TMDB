import React from 'react'
import LoadingSpinner from '@components/LoadingSpinner'
import SideBar from './SideBar'
import Main from './Main'
import { Box, Grid, GridItem } from "@chakra-ui/react"

interface IDiscoverProps {
  infos:discoverInfo,
  genres:discoverInfo,
  loading:boolean,
  error:boolean,
}

const DiscoverPresenter:React.FC<IDiscoverProps> = ({ genres, infos, loading, error }) => {

  return (
    <>
      { loading 
        ? <LoadingSpinner/> 
        : <Grid h="90vh" w="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={3}>
            <GridItem colSpan={1} rowSpan={2} m={1} width="17vw">
              <SideBar genres={genres}/>
            </GridItem>
            <GridItem colSpan={4} rowSpan={2} bg="black.200">
              <Main mainInfo={infos}/>
            </GridItem>
          </Grid>}
          
      { error ? <p>An error has occured</p>: null }

      
    </>
  )
}


export default DiscoverPresenter