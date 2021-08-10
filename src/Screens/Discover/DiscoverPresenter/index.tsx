import React from 'react'
import LoadingSpinner from '@components/LoadingSpinner'
import SideBar from './SideBar'
import Main from './Main'
import { Grid, GridItem } from "@chakra-ui/react"

interface IDiscoverProps {
  infos:discoverInfo
  genres:discoverInfo
  filterList:Array<any>
  addToFilter:(arg:any) => void
  removeFromFilter:(arg:any) => void
  loading:boolean
  error:boolean
}

const DiscoverPresenter:React.FC<IDiscoverProps> = ({ genres, infos, loading, error, filterList, addToFilter, removeFromFilter }) => {

  return (
    <>
      { loading 
        ? <LoadingSpinner/> 
        : <Grid h="90vh" w="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={3} overflowY="hidden">
            <GridItem colSpan={1} rowSpan={2} m={1}  position="relative" bottom="0"> 
              <SideBar 
                genres={genres} 
                filterList={filterList}
                addToFilter={addToFilter}
                removeFromFilter={removeFromFilter}
              />
            </GridItem>
            <GridItem colSpan={4} rowSpan={2} bg="black.200" overflowY="auto">
              <Main mainInfo={infos}/>
            </GridItem>
          </Grid>}
          
      { error ? <p>An error has occured</p>: null }
    </>
  )
}


export default DiscoverPresenter