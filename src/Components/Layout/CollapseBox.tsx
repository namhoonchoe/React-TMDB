import React  from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Text, Flex, Spacer, Collapse } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

interface ICollapseBoxProps {
  title:string
}

const CollapseBox:React.FC<ICollapseBoxProps> = ({ title, children }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Flex direction="row" align="center" justify="start" my={2} px={2}>
        <Text fontSize="lg">{title}</Text>
        <Spacer/>
          { isOpen 
            ? <ChevronUpIcon onClick={onToggle}/>
            : <ChevronDownIcon onClick={onToggle}/>
          }
      </Flex>
      <Collapse in={isOpen}>
        {children}
      </Collapse>
    </>
  )
}

export default CollapseBox