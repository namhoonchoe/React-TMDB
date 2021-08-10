import React, { useState } from 'react'
import { Link } from "react-router-dom";
import CollapseBox from '@components/CollapseBox'
import { Flex, Box, Text, Spacer, VStack, RadioGroup, Radio, Button, SlideFade } from "@chakra-ui/react"
import { CheckIcon, PlusSquareIcon } from '@chakra-ui/icons'

interface ISideBarProps {
  genres:discoverInfo
  filterList:Array<any>
  addToFilter:(arg:any) => void
  removeFromFilter:(arg:any) => void
}

const SideBar:React.FC<ISideBarProps> = ({ genres, filterList, addToFilter, removeFromFilter }) => {
  const [value, setValue] = useState<string>("1")
  const genreIDs = filterList.map((genre) => genre['id'])
  
  return (
    <Flex direction="column" justify="space-between" position="absolute" top="0" bottom="0" ml={2}  width="17vw">
      <Flex direction="row" justify="space-between" align="center" mx={4}>
        <Link to="/discover/movie">
          <Box fontSize="xl" fontWeight="semibold">
            <Text>Movies</Text>
          </Box>
        </Link>
        <Link to="/discover/series">
          <Box fontSize="xl" fontWeight="semibold">
            <Text>Series</Text>
          </Box>
        </Link>
      </Flex>
      <Flex direction="column" height="70vh" overflowY="auto">
        {genres !== null && genres.length > 0 && (
        <CollapseBox title="Genres" >
          <Flex direction="column" justify="center" align="start" m={2}>
            { genres.map((genre:any) => (
              <Flex direction="row" justify="stretch" align="center" width="full" >
              { genreIDs.includes(genre.id) 
                ? <Flex align="center" flexWrap="nowrap"  my={1} >
                    <CheckIcon onClick={() => removeFromFilter(genre)} mr={2}/>
                    <Text fontSize="md" fontWeight="light">{genre.name}</Text>
                  </Flex>
                : <Flex align="center" flexWrap="nowrap"  my={1}  >
                    <PlusSquareIcon onClick={() => addToFilter(genre)} mr={2}/>
                    <Text fontSize="md" fontWeight="light">{genre.name}</Text>
                  </Flex>
              }
              </Flex>))} 
          </Flex>
        </CollapseBox>)}
        { filterList !== null &&        
        <CollapseBox title="Filters">
          <Flex  flexWrap="wrap" maxW="full">
          { filterList.map((filter:any) => (
            <Text fontSize="md" fontWeight="light" mx={2} my={1}>{filter.name}</Text>
              ))}
          </Flex>           
        </CollapseBox>
        }
        <CollapseBox title="Sort by">
        <RadioGroup onChange={setValue} value={value}>
          <VStack align="flex-start" p={2}>
            <Radio value="1">Popularity</Radio>
            <Radio value="2">Release Date</Radio>
            <Radio value="3">Rating</Radio>
            <Radio value="4">Revenue</Radio>
          </VStack>
        </RadioGroup>
        </CollapseBox>
      </Flex>
      <Spacer/>
      <SlideFade in={(filterList.length > 0) === true} offsetY="20px">
        <Flex justify="center">
          <Button width="15vw">
            <Text>Discover</Text>
          </Button>
        </Flex>
      </SlideFade>
    </Flex>
  )
}


export default SideBar