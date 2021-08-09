import React, { useState } from 'react'
import { Link } from "react-router-dom";
import CollapseBox from '@components/CollapseBox'
import { Flex, Box, Text, Spacer, VStack, RadioGroup, Radio, Button } from "@chakra-ui/react"
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

interface ISideBarProps {
  genres:discoverInfo
}

const SideBar:React.FC<ISideBarProps> = ({ genres }) => {
  const [genreFilters, setGenreFilter] = useState<Array<any>>([])
  const [value, setValue] = useState<string>("1")

  const addToFilter = (input:any) => {
    setGenreFilter([...genreFilters,input])
  }

  const removeFromFilter = (input:any) => {
    setGenreFilter(genreFilters.filter((genreFilter) => genreFilter.id !== input.id ))
  }
  
  return (
    <Flex direction="column" position="sticky" ml={2}>
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
      <Flex direction="column" overflowY="auto" height="70vh">
        {genres !== null && genres.length > 0 && (
        <CollapseBox title="Genres" >
          <Flex direction="column" justify="center" align="start" m={2}>
            { genres.map((genre:any) => (
              <Flex direction="row" justify="stretch" align="center" width="full" >
                <MinusIcon onClick={() => removeFromFilter(genre)}/>
                <Spacer />
                <Box flexWrap="nowrap" my={1} p={1}>
                  <Text fontSize="md" fontWeight="light">{genre.name}</Text>
                </Box> 
                <Spacer />
                <AddIcon onClick={() => addToFilter(genre)}/>
              </Flex>))} 
          </Flex>
        </CollapseBox>)}

        <CollapseBox title="Filters">
          <Flex boxSize="15rem" flexWrap="wrap" >
            { genreFilters !== null && genreFilters.length > 0 &&
              genreFilters.map((genreFilter:any) => (
                <Box>
                  <Text>{genreFilter.name}</Text>
                </Box>
              ))
            }
          </Flex>           
        </CollapseBox>

        <CollapseBox title="Sort by">
        <RadioGroup onChange={setValue} value={value}>
          <VStack align="flex-start" p={2}>
            <Radio value="1">Rating</Radio>
            <Radio value="2">Popularity</Radio>
            <Radio value="3">Vote Count</Radio>
            <Radio value="4">Release Date</Radio>
          </VStack>
        </RadioGroup>
        </CollapseBox>
      </Flex>
      <Spacer/>
      <Flex justify="center">
        <Button width="15vw">
          <Text>Discover</Text>
        </Button>
      </Flex>
    </Flex>
  )
}


export default SideBar