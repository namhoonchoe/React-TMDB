import React from 'react'
import LoadingSpinner from '@components/LoadingSpinner'
import SideBar from './SideBar'
import Main from './Main'
import { Grid, GridItem, Box, Flex } from "@chakra-ui/react"

interface IDiscoverProps {
  infos:discoverInfo
  genres:discoverInfo
  genreFunctions:IGenreFunctions
  filterList:Array<any>
  loading:boolean
  error:boolean
}

const DiscoverPresenter:React.FC<IDiscoverProps> = ({ genres, infos, loading, error, filterList, genreFunctions }) => {

  return (
    <>
      { loading 
        ? <LoadingSpinner/> 
        : <Flex justify="start" position="relative" w="100%">
          <Grid  templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={8} >
            <Box position="sticky" top="8%" >
            <GridItem colSpan={1} rowSpan={2} justifyContent="center">
              <SideBar 
                genres={genres} 
                filterList={filterList}
                addToFilter={genreFunctions.addToFilter}
                removeFromFilter={genreFunctions.removeFromFilter}
                discoverTrigger={genreFunctions.discoverTrigger}
              />
            </GridItem>
            </Box>
            <GridItem colSpan={4} rowSpan={2} >
              <Main 
                mainInfo={infos}
                fetchMore={genreFunctions.fetchMore}
              />
            </GridItem>
          </Grid>
          </Flex>
      }
          
      { error ? <p>An error has occured</p>: null }
    </>
  )
}


export default DiscoverPresenter