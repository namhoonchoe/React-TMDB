import React from 'react'
import { Flex, 
  VStack,
  HStack, 
  Box, 
  Container,
  Text, 
  Spacer } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import InfoImage from "@components/InfoImage";
import ModalBox from "@components/ModalBox";
import BookMark from "@components/BookMark";
import StarRating from "@components/StarRating"


interface IHeaderProps {
  detail:any,
  cast:any,
}

const DetailHeader:React.FC<IHeaderProps> = ({ detail, cast }) => {
  const uniqueId = detail.id
  const bookMarkType = usePathTypeCheck()

  return (
  <>
    <Flex direction="column" width={"100vw"} height={"24rem"} >
      <Flex justify="center" >
        <InfoImage
          borderRadius={"md"}
          imageType={"poster"}
          width={"15rem"}
          height={"21rem"}
          imageSource={detail.poster_path}
        />
        <VStack>
          <Container maxW="sm">
            <Text fontWeight="semibold" fontSize="3xl">{detail.original_title}</Text>
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
                    <Text mr={2}>{detail.release_date}</Text>
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
                  bookMarkId={uniqueId}
                />
              </HStack>
              <Flex flexWrap="wrap">{detail.genres.map((genre:any) => (
                <Box border="1px" borderRadius="lg" borderColor="lightgrey" m={[2,1]} p={[0.25, 0.5]} >
                  <Text>{genre.name.toString()}</Text>
                </Box>))}
                </Flex>
            </Container>
          </VStack>
      </Flex>
      <Box 
        zIndex={"-1"}
        position="fixed"
        top={"0"}
        left={"0"}
        opacity={"0.15"}
        width="100%"
        height={"25rem"}
        bgSize="cover"
        bgImage = {
          detail.backdrop_path !== null 
          ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
          : "none" }
        bgPosition="top"
        bgRepeat="no-repeat"></Box>        
    </Flex>
  </>
  )
}


export default DetailHeader