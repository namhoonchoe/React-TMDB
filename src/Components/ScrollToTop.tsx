import React from 'react'
import { Flex } from "@chakra-ui/react"
import { ArrowUpIcon } from '@chakra-ui/icons'

const ScrollToTop:React.FC= () => {
  return (
    <>
      { onscroll 
      ? null    
      : <Flex borderRadius="full" justify="center" align="center" boxSize="4rem" bgColor="blue.400" position="fixed"  bottom="5%" right="1.5%">
          <ArrowUpIcon color="white" fontSize="2xl" fontWeight="extrabold" />
        </Flex>
      } 
    </>
  )
}


export default ScrollToTop