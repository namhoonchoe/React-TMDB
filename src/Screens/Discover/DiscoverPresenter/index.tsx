import React from 'react'
import LoadingSpinner from '@components/LoadingSpinner'
import SideBar from './SideBar'
import Main from './Main'
import { Grid, GridItem } from "@chakra-ui/react"

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
        : <Grid maxH="100vh" w="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={8} overflowY="hidden">
            <GridItem colSpan={1} rowSpan={2} m={1} maxH="max" position="relative" bottom="0"> 
              <SideBar 
                genres={genres} 
                filterList={filterList}
                addToFilter={genreFunctions.addToFilter}
                removeFromFilter={genreFunctions.removeFromFilter}
                discoverTrigger={genreFunctions.discoverTrigger}
              />
            </GridItem>
            <GridItem colSpan={4} rowSpan={2} overflowY="auto">
              <Main 
                mainInfo={infos}
                fetchMore={genreFunctions.fetchMore}
              />
            </GridItem>
          </Grid>}
          
      { error ? <p>An error has occured</p>: null }
    </>
  )
}


export default DiscoverPresenter