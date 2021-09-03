import React from 'react'
import { Flex, VStack, HStack,  Box, Container, Text, Spacer, Fade } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import InfoImage from "@components/Layout/InfoImage";
import ModalBox from "@components/Layout/ModalBox";
import BookMark from "@components/BookMark";
import StarRating from "@components/StarRating"


interface IHeaderProps {
  detail:any,
  loading:boolean
}

const DetailHeader:React.FC<IHeaderProps> = ({ detail, loading }) => {
  const bookMarkType = usePathTypeCheck()

  return (
  <>
    <Fade in={!loading}>
    <Flex width={"100vw"} height={"70vh"} position="absolute" top="0" zIndex="-10" >
      <Box 
        width="100%"
        height="100%"
        bgSize="cover"
        bgColor="black"
        boxShadow="21em 2px 30px 10px rgba(2,2,4,1) inset"
        bgImage = {
        detail.backdrop_path !== null 
        ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
        : "none" }
        filter="brightness(70%)"
        bgPosition="20em 5%"
        borderRadius="sm"
        bgRepeat="no-repeat">
      </Box>            
    </Flex>
    <Flex 
      width={"100vw"} height={"70vh"} 
      color="white"
      pt="3em"
      pl="10em">
      <InfoImage
        borderRadius={"md"}
        imageType={"poster"}
        width={"15rem"}
        height={"21rem"}
        imageSource={detail.poster_path}/>
      <VStack>
        <Container maxW="sm">
          <Text fontWeight="semibold" fontSize="3xl">{detail.title||detail.name}</Text>
        </Container>
        <Container maxW="sm">
          { detail.tagline !== "" 
            ? <VStack align="start">
                <Text as="cite">"{detail.tagline}"</Text>                   
                  {detail.overview.length > 100 
                  ? <Box maxWidth="xs" maxHeight="xs">{detail.overview.substring(0, 100)}... 
                      <ModalBox modalcontent={detail.overview}/>
                    </Box>
                  : <Box maxWidth="xs" maxHeight="xs">{detail.overview}</Box> 
                }
              </VStack>
            : <VStack>
                <Spacer/>
                <Box maxWidth="xs">
                {detail.overview.length > 100 
                ? <Box maxWidth="xs" maxHeight="xs">{detail.overview.substring(0, 100)}... 
                    <ModalBox modalcontent={detail.overview}/>
                  </Box>
                : <Box maxWidth="xs" maxHeight="xs">{detail.overview}</Box> }
                </Box>
              </VStack>
              }              
          </Container>
          <Container maxW="sm">
            <HStack justify="start">
              <VStack>
                <Flex>
                  <Text mr={2}>{detail.release_date || detail.first_air_date}</Text>
                  <Text>{detail.status}</Text>
                </Flex>
                <Flex justify="start" align="center">
                  <StarRating rating={detail.vote_average}/>
                  <Text ml={2}>{detail.vote_average}/10</Text>
                </Flex>
              </VStack>
              <BookMark 
                bookMarkDetail={detail}
                bookMarkType={bookMarkType}
                bookMarkId={detail.id}
              />
            </HStack>
            <Flex flexWrap="wrap">{detail.genres.map((genre:any) => (
              <Box borderRadius="lg" bgColor="white" m={2} p={1} >
                <Text>{genre.name.toString()}</Text>
              </Box>))}
            </Flex>
          </Container>
        </VStack>
      </Flex>
    </Fade>
  </>
  )
}


export default DetailHeader