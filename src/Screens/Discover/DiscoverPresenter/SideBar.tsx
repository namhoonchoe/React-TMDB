import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import CollapseBox from '@components/CollapseBox'
import { Flex, Box, Text, Spacer, VStack, RadioGroup, Radio, Button, SlideFade } from "@chakra-ui/react"
import { MinusIcon, AddIcon, TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import MovieIcon from '@components/svgcomponents/MovieIcon'
import SeriesIcon from '@components/svgcomponents/SeriesIcon'


interface IGenreFilter {
  info:any,
  type:string
}

interface ISideBarProps {
  genres:discoverInfo
  filterList: Array<IGenreFilter>
  addToFilter:(arg:any) => void
  removeFromFilter:(arg:any) => void
  discoverTrigger:(sort:any,genreInclude:any,genreExclude:any) => void
}

const SideBar:React.FC<ISideBarProps> = ({ genres, filterList, addToFilter, removeFromFilter, discoverTrigger }) => {
  const [value, setValue] = useState<string>("1")
  const [orderDescending, setOrderDescending] = useState<boolean>(true)
  const [sortQuery, setSortQuery] = useState<string>("")
  const excludeFilter = filterList.filter((filter) => filter.type === "exclude")
  const includeFilter = filterList.filter((filter) => filter.type === "include")
  const excludeIds = excludeFilter.map((genre) => genre.info['id'])
  const includeIds = includeFilter.map((genre) => genre.info['id'])

  useEffect(() => {
    let mounted = true

    const sort = () => {
      if(orderDescending) {
        switch(value) {
          case "4":
            setSortQuery("revenue.desc")
            break
          case "3":
            setSortQuery("vote_average.desc")
            break
          case "2":
            setSortQuery("release_date.desc")
            break
          case "1":
            setSortQuery("popularity.desc")
            break
        }
      } else {
        switch(value) {
          case "4":
            setSortQuery("revenue.asc")
            break
          case "3":
            setSortQuery("vote_average.asc")
            break
          case "2":
            setSortQuery("release_date.asc")
            break
          case "1":
            setSortQuery("popularity.asc")
            break
        }
      }
    }

    if(mounted) {
      sort()
    }

    return () => {
      mounted = false
    }
  }, [value,orderDescending])

  return (  
    <Flex direction="column" justify="space-between"
          position="absolute" top="0" bottom="0" 
          ml={2}  width="100%" 
          border="1px" borderRadius="md" borderColor="gray.300">
      <Flex direction="row" justify="space-around" align="center" >
        <Link to="/discover/movie">
          <Flex fontSize="xl" fontWeight="semibold" align="center" p={1}>
            <MovieIcon/>
            <Text ml={1}>Movies</Text>
          </Flex>
        </Link>
        <Link to="/discover/series">
          <Flex fontSize="xl" fontWeight="semibold"  align="center" p={1}>
            <SeriesIcon/>
            <Text ml={1}>Series</Text>
          </Flex>
        </Link>
      </Flex>
      <Flex direction="column" p={1} overflowX="unset" overflowY="auto" >
        {genres !== null && genres.length > 0 && (
        <CollapseBox title="Genres">
          <Flex direction="column" justify="center" align="start" m={2}>
            { genres.map((genre:any) => (
              <Flex direction="row" width="full" flexWrap="wrap" >
                <Flex justify="space-between" align="center" width="95%" m={1} textColor="gray.400">
                { includeIds.includes(genre.id) === false && excludeIds.includes(genre.id) === false &&
                <>
                  <MinusIcon onClick={()=> addToFilter({info:genre,type:"exclude"})}/>
                  <Box>
                    <Text fontSize="md" fontWeight="thin" textColor="gray.600">{genre.name}</Text>
                  </Box>
                  <AddIcon onClick={()=> addToFilter({info:genre,type:"include"})} /> 
                </>                                            
                }

                { includeIds.includes(genre.id) && excludeIds.includes(genre.id) === false &&
                <>
                  <MinusIcon onClick={()=> addToFilter({info:genre,type:"exclude"})}/>
                  <Box>
                    <Text fontSize="md" fontWeight="thin" textColor="gray.600">{genre.name}</Text>
                  </Box>
                  <AddIcon onClick={()=> removeFromFilter({info:genre,type:"include"})} color="green.300"/> 
                </>
                }
                  
                { includeIds.includes(genre.id) === false && excludeIds.includes(genre.id) &&
                <>
                  <MinusIcon onClick={()=> removeFromFilter({info:genre,type:"exclude"})} color="red.300"/>
                  <Box>
                    <Text  fontSize="md" fontWeight="thin" textColor="gray.600">{genre.name}</Text>
                  </Box>
                  <AddIcon onClick={()=> addToFilter({info:genre,type:"include"})} /> 
                </>     
                }    
                </Flex> 
              </Flex>))} 
          </Flex>
        </CollapseBox>)}
        { filterList !== null &&        
        <CollapseBox title="Filters">
          <Flex align="center" width="95%" m={1}>
            <VStack align="start">
              <Box>
                <Text fontSize="sm" as="em">Include</Text>
                <Flex justify="start" align="center" flexWrap="wrap">
                { includeFilter.map((filter:any) => (
                  <Box onClick={()=> removeFromFilter({info:filter.info,type:"include"})} >
                    <Text fontSize="md" fontWeight="light" mx={2} my={1}>{filter.info.name}</Text>
                  </Box>))}
                </Flex>
              </Box>
              <Box>
                <Text fontSize="sm" as="em">Exclude</Text>
                <Flex justify="start" align="center" flexWrap="wrap">
                { excludeFilter.map((filter:any) => (
                  <Box onClick={()=> removeFromFilter({info:filter.info,type:"exclude"})} >
                    <Text fontSize="md" fontWeight="light" mx={2} my={1}>{filter.info.name}</Text>
                  </Box>))}    
                </Flex> 
              </Box>
            </VStack>
          </Flex>           
        </CollapseBox>
        }
        <CollapseBox title="Sort by">
          <>
          { orderDescending
          ? <Flex boxSize="max-content" 
                  my={3} 
                  justify="start" align="center"
                  onClick={() => setOrderDescending(!orderDescending)}>
              <Text fontWeight="thin" py={1} pr={1} mr={2}>Order Descending</Text>
              <TriangleDownIcon/>
            </Flex>
          : <Flex boxSize="max-content" 
                  my={3} 
                  justify="start" align="center"
                  onClick={() => setOrderDescending(!orderDescending)}>
              <Text fontWeight="thin" py={1} pr={1} mr={2}>Order Aescending</Text>
              <TriangleUpIcon/>
            </Flex> }
          <RadioGroup onChange={setValue} value={value}>
            <VStack align="flex-start" p={2}>
              <Radio value="1">Popularity</Radio>
              <Radio value="2">Release Date</Radio>
              <Radio value="3">Rating</Radio>
              <Radio value="4">Revenue</Radio>
            </VStack>
          </RadioGroup>
          </>
        </CollapseBox>
      </Flex>
      <Spacer/>
      <SlideFade in={(filterList.length > 0) === true}>
        <Flex justify="center">
          <Button width="15vw" onClick={() => discoverTrigger(sortQuery, includeIds.toString(),excludeIds.toString())}>
            <Text>Discover</Text>
          </Button>
        </Flex>
      </SlideFade>
    </Flex>
  )
}

export default SideBar