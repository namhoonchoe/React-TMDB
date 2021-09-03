import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Flex, VStack, Grid, GridItem, Box, Container, Text, Fade } from "@chakra-ui/react"
import Section from "@components/Layout/Section"
import InfoImage from '@components/Layout/InfoImage';
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'

interface IBodyProps {
  detail:any
  credits:any
  similars:any
}

const DetailBody:React.FC<IBodyProps> = ({ detail, credits, similars }) => {
  const pathType = usePathTypeCheck()
  let history = useHistory()

  const toPerson = (path:string) => {
    history.replace(path)
  }

  return (
    <>
      <Flex direction="column" align="start" width="96vw" >
      <Grid
        width="100%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        >
        <GridItem rowSpan={2} colSpan={5}>
          <VStack align="start">
            {/*casting*/}
            <Flex direction="column" mb={"5%"}>
            <Text fontSize="2xl" mb={3} fontWeight="semibold" >Cast</Text>
            <Grid templateColumns="repeat(5, 1fr)" gap="8">
              {credits.cast.map((data:any) => (
                <>
                  <Flex direction="column" 
                      justify="stretch" 
                      align="center" 
                      key={data.id} 
                      py={2} pt={3} 
                      width="14rem" 
                      height="13rem"
                      backgroundColor="gray.200" 
                      borderRadius="lg" 
                      boxShadow="xl"
                      onClick={() => toPerson(`/person/${data.id}`)}>
                  <InfoImage
                    width="7rem" 
                    height="7rem"
                    imageSource={data.profile_path}
                    imageType="portrait"
                    borderRadius="full"
                  />
                  <Flex direction="column" flexWrap="wrap" align="center" justify="center" p={1}>
                    <Text fontSize="sm" fontWeight="semibold">{data.name}</Text>
                    <Text fontSize="xs">as</Text>
                    <Text fontSize="sm" fontWeight="hairline">{data.character}</Text>
                  </Flex>
                </Flex>
                </>
              ))}
            </Grid>
            </Flex>
            {/*Similars*/}
            <Section  
              title={pathType === "movie" ? "Similar Movies" : "Similar Series"}
              sectionInfos={similars}
              sectionInfoType={pathType === "movie" ? "movie" : "series"}/>        
          </VStack>
        </GridItem>
        <GridItem  rowSpan={2} colSpan={1} >
          <Text fontSize="2xl" mb={3} fontWeight="semibold" >Info</Text>
          <Flex direction="column" align="start" justify="start" >
            {/*Futher infos*/}
              <Flex direction="column" borderRadius="md" >
                <Text p={1} fontWeight="semibold" >Original Title</Text>
                <Text p={1}>{detail.original_title || detail.original_name}</Text>
              </Flex>
            { pathType === "movie" &&
              <>
                <Flex direction="column" borderRadius="md" >
                  <Text p={1} fontWeight="semibold">Director</Text>
                  {credits.crew.filter((person:any) => person.job ==="Director").map((person:any) => person['name'])}
                </Flex>
                <Flex >
                  <Text p={1} fontWeight="semibold">Runtime</Text>
                  <Text p={1}>{detail.runtime}'</Text>
                </Flex>
                <Flex >
                  <Text p={1} fontWeight="semibold">Release Date</Text>
                  <Text p={1}>{detail.release_date}</Text>  
                </Flex>
              </>
            } 
            { pathType === "series" && 
              <>
              {detail.created_by !== null && detail.created_by.length > 0 &&
                <Flex direction="column">
                  <Text p={1} fontWeight="semibold">Director</Text>
                  <Text p={1}>{detail.created_by[0].name}</Text>
                </Flex>
              }
              <Flex>
                <Text p={1} fontWeight="semibold">Episode Runtime</Text>
                <Flex>
                  {detail.episode_run_time.map((runtime:any) => (
                  <Text p={1}>{runtime}'</Text>
                  ))}
                </Flex>
              </Flex>
              <Flex>
                <Text p={1} fontWeight="semibold">Number of Seasons</Text>
                <Text p={1}>{detail.number_of_seasons}</Text> 
              </Flex>
              <Flex>
                <Text p={1} fontWeight="semibold">Number of Episodes</Text  >
                <Text p={1}>{detail.number_of_episodes  }</Text>
              </Flex>
              <Flex>
                <Text p={1} fontWeight="semibold">First Air Date</Text>
                <Text p={1}>{detail.first_air_date}</Text>
              </Flex>
              <Flex>
                <Text p={1} fontWeight="semibold">Last Air Date</Text>
                <Text p={1}>{detail.last_air_date}</Text>
              </Flex>
              </>
            }  
            <Flex>
              <Text p={1} fontWeight="semibold">Status</Text>
              <Text p={1}>{detail.status}</Text>
            </Flex>
            <Flex>
              <Text p={1} fontWeight="semibold">Original Language</Text>
              <Box  p={1} mr={2} boxSize="max-content" borderRadius="lg" backgroundColor="gray.400">{detail.original_language}</Box>
            </Flex>
            <Flex>
              <Text p={1} fontWeight="semibold">Language</Text>
              <Flex align="center">
                {detail.spoken_languages.map((language:any) =>
                (<Box p={1} mr={2} boxSize="max-content" borderRadius="lg" backgroundColor="gray.400">{language.iso_639_1}</Box>))}
              </Flex>                
            </Flex>
            { detail.revenue > 0 &&
            <Flex>
              <Text p={1} fontWeight="semibold">Revenue</Text>
              <Text p={1}>${detail.revenue}</Text>
            </Flex>
            }
          </Flex>
        </GridItem>
      </Grid>  
      </Flex>
    </>
  )
}


export default DetailBody