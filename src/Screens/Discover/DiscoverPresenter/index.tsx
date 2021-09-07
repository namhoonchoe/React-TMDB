import React from 'react'
import LoadingSpinner from '@components/LoadingSpinner'
import SideBar from './SideBar'
import Main from './Main'
import { Grid, GridItem, Box, Flex } from "@chakra-ui/react"

interface IDiscoverProps {
  loading:boolean
  error:boolean
}

const DiscoverPresenter:React.FC<IDiscoverProps> = ({ loading, error }) => {

  return (
    <>
      { loading 
        ? <LoadingSpinner/> 
        : <Flex position="relative" width="100%">
            <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={8} >
              <Box position="sticky" top="8%" >
              <GridItem colSpan={1} rowSpan={2} justifyContent="center" position="sticky" top="9%" left="1%" >
                <SideBar />
              </GridItem>
              </Box>
              <GridItem colSpan={4} rowSpan={2} >
                <Main />
              </GridItem>
            </Grid>
        </Flex>
      }
          
      { error ? <p>An error has occured</p>: null }
    </>
  )
}


export default DiscoverPresenter