import React, { FormEventHandler, ReactEventHandler, useState } from 'react'
import { getSearchTerm} from '@redux/searchSlice'
import { useSelector, useDispatch } from 'react-redux' 
import { Search2Icon,CloseIcon } from '@chakra-ui/icons'
import { InputGroup,Input,Flex } from '@chakra-ui/react'

type SearchTerm = null|string|number

const SearchBox:React.FC = () => {
  const [clicked,setClicked] = useState<boolean>(false)
  const [searchTerm,setSearchTerm] = useState<SearchTerm>(null)
  const dispatch = useDispatch()

  const toggleClick = (e:any) => {
    setClicked(!clicked)
  }

  const onSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(getSearchTerm(searchTerm))
    setSearchTerm(null)
  }

  

  return (
  <>
    <Flex justify="center" align="center" >
      {
        clicked ? 
          <InputGroup display="flex" alignItems="center"  h={4} >
            <form onSubmit={onSubmit}>
              <Input placeholder="Search" size="sm" mr={2}/> <CloseIcon onClick={toggleClick}/>
            </form>
          </InputGroup>
        : <Search2Icon onClick={toggleClick} w={4} h={4}/>
      }
    </Flex>
  </>
  )

}

export default SearchBox