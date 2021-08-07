import React, { useState } from 'react'
import { Link } from "react-router-dom";
import CollapseBox from '@components/CollapseBox'
import { Grid, GridItem, Flex, Box, Text, Spacer, VStack, RadioGroup, Radio, Button } from "@chakra-ui/react"

interface IDiscoverProps {
  infos:discoverInfo,
  genres:discoverInfo,
  loading:boolean,
  error:boolean,
}

const DiscoverPresenter:React.FC<IDiscoverProps> = ({ genres, infos, loading, error }) => {
  const [value, setValue] = useState<string>("1")

  return (
    <>
      <Grid
        h="90vh"
        w="100%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={3}>
        <GridItem colSpan={1} rowSpan={2} m={1} width="15vw">
          <Flex direction="column">
            <Flex direction="row" justify="center"align="center" mx={4}>
              <Link to="/discover/movie">
                <Box fontSize="xl" fontWeight="semibold">
                  <Text>Movies</Text>
                </Box>
              </Link>
              <Spacer/>
              <Link to="/discover/series">
                <Box  fontSize="xl" fontWeight="semibold">
                  <Text>Series</Text>
                </Box>
              </Link>
            </Flex>
            <Flex direction="column" overflowY="auto" height="70vh">
              {genres !== null && genres.length >0 && (
              <CollapseBox title="Genres" >
                <VStack>
                  { genres.map((genre:any) => (
                    <Box>
                      <Text>{genre.name}</Text>
                    </Box>))}
                </VStack>
              </CollapseBox>)}
              <CollapseBox title="Filters">
                <Flex boxSize="15rem" flexWrap="wrap" >
                  <Box m={1}>
                    <Text>
                      Action
                    </Text>
                  </Box>
                  <Box m={1}>
                    <Text>
                      Animation
                    </Text>
                  </Box>
                  <Box m={1}> 
                    <Text>
                      Drama
                    </Text>
                  </Box>
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
            <Button width="15vw">
              <Text>Discover</Text>
            </Button>
          </Flex>
        </GridItem>
        <GridItem colSpan={4} rowSpan={2} bg="black.200">
        </GridItem>
      </Grid>
      
    </>
  )
}


export default DiscoverPresenter