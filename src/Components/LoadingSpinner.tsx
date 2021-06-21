import React from 'react'
import { Flex,Spinner } from "@chakra-ui/react"

export default function LoadingSpinner() {
  return (
    <Flex justify="center" align="center" my={30}>
  	  <Spinner size="xl" color="blue.500" />
    </Flex>
  )
}
