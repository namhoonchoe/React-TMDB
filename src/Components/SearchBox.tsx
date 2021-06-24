import { useState } from 'react'
import { Search2Icon,CloseIcon } from '@chakra-ui/icons'
import { InputGroup,Input,Flex } from '@chakra-ui/react'


const SearchBox:React.FC= () => {
  const[clicked,setClicked] = useState<boolean>(false)

  const toggleClick = (e:any) => {
    e.preventDefault()
    setClicked(!clicked)
  }

  return (
    <>
      <Flex justify="center" align="center" >
        {
          clicked ? 
          <InputGroup display="flex" alignItems="center"  h={4} >
            <Input placeholder="Search" size="sm" mr={2} /> <CloseIcon onClick={toggleClick}/>
          </InputGroup>
          : <Search2Icon onClick={toggleClick} w={4} h={4}/>
        }
      </Flex>
    </>
  )
}

export default SearchBox