import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { getSearchTerm } from '@redux/searchSlice'
import {  useDispatch } from 'react-redux' 
import { Search2Icon, CloseIcon } from '@chakra-ui/icons'
import { Input, Flex } from '@chakra-ui/react'


const SearchBox:React.FC = () => {
  const [clicked,setClicked] = useState<boolean>(false)
  const [term, setTerm] = useState("")
  const dispatch = useDispatch()
  
  const toggleClick = (e:MouseEvent) => {
    e.preventDefault()
    setClicked(!clicked)
  }

  const onChange = (e:ChangeEvent<HTMLInputElement> ) => {
    setTerm(e.target.value)
  }

  const onSubmit = (e:FormEvent) => {
    e.preventDefault()
    dispatch(getSearchTerm(term))
    setTerm("")
  } 


  return (
  <>
    <Flex justify="center" align="center" width="max"> 
      {
        clicked ? 
          <form onSubmit={onSubmit}>
            <Flex justify="center" alignItems="center" h={4} >
              <Input 
                value={term}
                onChange={onChange}
                placeholder="Search" 
                mr={2}/> 
              <CloseIcon onClick={toggleClick}/>
            </Flex> 
          </form>
        : <Search2Icon onClick={toggleClick} w={4} h={4}/>
      }
    </Flex>
  </>
  )

}

export default SearchBox