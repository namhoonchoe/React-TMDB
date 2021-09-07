import React, { useState, useEffect } from 'react'
import { selectDiscoverInfoGenres, selectGenreFilters, selectExcludeFilter, selectIncludeFilter, selectExcludeId, selectIncludeId,
        addToFilter, removeFromFilter, discoverTrigger, resetQuery, resetFilter } from '@redux/discoverSlice';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import CollapseBox from '@components/Layout/CollapseBox'
import { Flex, Box, Text, Spacer, VStack, RadioGroup, Radio, Button, SlideFade } from "@chakra-ui/react"
import { MinusIcon, AddIcon, TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import MovieIcon from '@components/svgcomponents/MovieIcon'
import SeriesIcon from '@components/svgcomponents/SeriesIcon'

const SideBar:React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>("1")
  const [orderDescending, setOrderDescending] = useState<boolean>(true)
  const [sortQuery, setSortQuery] = useState<string>("")
  
  const discoverGenres = useSelector(selectDiscoverInfoGenres)
  const filterList = useSelector(selectGenreFilters)
  const excludeFilter = useSelector(selectExcludeFilter)
  const includeFilter = useSelector(selectIncludeFilter)
  const excludeIds = useSelector(selectExcludeId)
  const includeIds = useSelector(selectIncludeId)

  const resetTrigger = () => {
    dispatch(resetFilter())
    dispatch(resetQuery())
  }

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
    <Flex direction="column" justify="space-between" width="15vw" height="90vh" ml={2} >
      <Flex direction="row" justify="space-around" align="center" >
        <Link to="/discover/movie">
          <Flex fontSize="xl" fontWeight="semibold" align="center" p={1} onClick={() => resetTrigger()}>
            <MovieIcon/>
            <Text ml={1}>Movies</Text>
          </Flex>
        </Link>
        <Link to="/discover/series">
          <Flex fontSize="xl" fontWeight="semibold"  align="center" p={1} onClick={() => resetTrigger()}>
            <SeriesIcon/>
            <Text ml={1}>Series</Text>
          </Flex>
        </Link>
      </Flex>
      <Flex direction="column" p={1} overflowX="unset" overflowY="auto" 
            sx={{ '&::-webkit-scrollbar': {
                    width: '8px',
                    borderRadius: '8px',
                    backgroundColor: `rgba(0, 0, 0, 0.1)`,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '4px',
                    backgroundColor: `rgba(141,144, 150, 0.3)`,
                  },
                }} >
        {discoverGenres !== null && discoverGenres.length > 0 && (
        <CollapseBox title="Genres">
          <Flex direction="column" justify="center" align="start" m={2}>
            { discoverGenres.map((genre:any) => (
              <Flex direction="row" width="full" flexWrap="wrap" >
                <Flex justify="space-between" align="center" width="95%" m={1} textColor="gray.400">
                { includeIds.includes(genre.id) === false && excludeIds.includes(genre.id) === false &&
                <>
                  <MinusIcon onClick={()=> dispatch(addToFilter({info:genre,type:"exclude"}))}/>
                  <Box>
                    <Text fontSize="md" fontWeight="thin" color="gray.600">{genre.name}</Text>
                  </Box>
                  <AddIcon onClick={()=> dispatch(addToFilter({info:genre,type:"include"}))} /> 
                </>                                            
                }

                { includeIds.includes(genre.id) && excludeIds.includes(genre.id) === false &&
                <>
                  <MinusIcon onClick={()=> dispatch(addToFilter({info:genre,type:"exclude"}))}/>
                  <Box>
                    <Text fontSize="md" fontWeight="thin" color="gray.600">{genre.name}</Text>
                  </Box>
                  <AddIcon onClick={()=> dispatch(removeFromFilter({info:genre,type:"include"}))} color="green.300"/> 
                </>
                }
                  
                { includeIds.includes(genre.id) === false && excludeIds.includes(genre.id) &&
                <>
                  <MinusIcon onClick={()=> dispatch(removeFromFilter({info:genre,type:"exclude"}))} color="red.300"/>
                  <Box>
                    <Text fontSize="md" fontWeight="thin" color="gray.600">{genre.name}</Text>
                  </Box>
                  <AddIcon onClick={()=> dispatch(addToFilter({info:genre,type:"include"}))} /> 
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
                  <Box onClick={()=> dispatch(removeFromFilter({info:filter.info,type:"include"}))} >
                    <Text fontSize="md" fontWeight="light" mx={2} my={1}>{filter.info.name}</Text>
                  </Box>))}
                </Flex>
              </Box>
              <Box>
                <Text fontSize="sm" as="em">Exclude</Text>
                <Flex justify="start" align="center" flexWrap="wrap">
                { excludeFilter.map((filter:any) => (
                  <Box onClick={()=> dispatch(removeFromFilter({info:filter.info,type:"exclude"}))} >
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
        <Flex justify="center" p={1}>
          <Button width="15vw" onClick={() => 
            dispatch(discoverTrigger({ sort:sortQuery, 
                                      genreInclude:includeIds.toString(), 
                                      genreExclude:excludeIds.toString() }))}>
            <Text>Discover</Text>
          </Button>
        </Flex>
      </SlideFade>
    </Flex>
  )
}

export default SideBar