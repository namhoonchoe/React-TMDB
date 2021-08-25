import React from "react";
import Section from "@components/Section"
import { VStack, Grid, GridItem, Flex, Box, Text , Menu, MenuButton, MenuList, MenuItem  } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"
import ScrollToTop from "@components/ScrollToTop";
import PopularIcon from '@components/svgcomponents/PopularIcon'
import NowPlaying from '@components/svgcomponents/NowPlaying'

interface ISerieseProps {
  topRated:null|SeriesData,
  airingToday:null|SeriesData,
  popular:null|SeriesData,
  error:boolean,
  loading:boolean
}

const TvPresenter:React.FC<ISerieseProps> = ({topRated,airingToday,popular,error,loading}) => {
  return (
  <>
    { loading 
      ?<LoadingSpinner/> 
      : <>
        {/* Main content*/}
        <Flex justify="start" position="relative" w="100%">
          <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={8} >
            {/* Side navigation */}
            <Box position="sticky" top="8%" >
            <GridItem colSpan={1} rowSpan={2} justifyContent="center">
              <Box position="fixed" top="8%" left="2%" width="15rem" height="5rem" >
                <Menu isLazy>
                  <MenuButton>
                    <Text fontSize="2xl" textColor="gray.600" fontWeight="semibold">Contents</Text>
                  </MenuButton>
                  <MenuList>
                    {/* MenuItems are not rendered unless Menu is open */}
                    <MenuItem>
                      <Flex justify="start" align="center" m={1} p={1}>
                        <NowPlaying/>
                        <Text fontSize="xl" textColor="gray.600" fontWeight="hairline">Airing Today</Text>
                      </Flex>
                    </MenuItem>
                    <MenuItem> 
                      <Flex justify="start" align="center" m={1} p={1}>
                        <PopularIcon/>
                        <Text fontSize="xl" textColor="gray.600" fontWeight="hairline">Popular Series</Text>
                      </Flex>
                    </MenuItem>
                    <MenuItem>
                      <Flex justify="start" align="center" m={1} p={1}>
                        <PopularIcon/>
                        <Text fontSize="xl" textColor="gray.600" fontWeight="hairline">TopRated Series</Text>
                      </Flex>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </GridItem>
            </Box>
            <GridItem colSpan={4} rowSpan={2}>
              {/* Main Content */}
              <VStack spacing="8" >
                { airingToday !== null && airingToday.length > 0 && 
                <Section 
                  title={"Airing Today"}
                  sectionInfos={airingToday}
                /> } 

                { popular !== null && popular.length > 0 && 
                <Section  
                  title={"Popular Series"}
                  sectionInfos={popular} 
                /> }   

                { topRated !== null && topRated.length > 0 && 
                <Section 
                  title={"TopRated Series"}
                  sectionInfos={topRated}
                /> } 
              </VStack> 
              </GridItem>
            </Grid>
        </Flex>
      {/* To the page top */}
      <ScrollToTop/>
      </>
    }
    
    { error ? <p>An error has occured</p>: null }
  </>
  )
};

export default TvPresenter;
