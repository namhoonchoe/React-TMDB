import React, { useState } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Text, VStack, Flex, Spacer, Collapse, Box } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

interface ICollapseBoxProps {
  title?:string
  body?:any
}

const CollapseBox:React.FC<ICollapseBoxProps> = ({ title, body }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Flex direction="row" align="center" justify="start" my={2} px={2}>
        <Text>{title}</Text>
        <Spacer/>
          { isOpen 
            ? <ChevronUpIcon onClick={onToggle}/>
            : <ChevronDownIcon onClick={onToggle}/>
          }
      </Flex>
      <Collapse in={isOpen}>
      <Box
        p="40px"
        color="white"
        mt="4"
        mx={3}
        bg="teal.500"
        rounded="md"
        shadow="md"
      >
      Fade
      </Box>
      </Collapse>
    </>
  )
}

export default CollapseBox