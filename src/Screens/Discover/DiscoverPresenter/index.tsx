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
        :<>
        <Flex position="absolute" top="14" left="0" overflowY="hidden">
          <SideBar />
        </Flex>
        <Flex justify="center" width="70%" ml="6em">
          <Main />
        </Flex>
        </>
      }
          
      { error ? <p>An error has occured</p>: null }
    </>
  )
}


export default DiscoverPresenter