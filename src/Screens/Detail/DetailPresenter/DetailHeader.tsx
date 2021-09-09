import React from 'react'
import { Flex, VStack, HStack,  Box, Text, Fade } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import InfoImage from "@components/Layout/InfoImage";
import ModalBox from "@components/Layout/ModalBox";
import BookMark from "@components/BookMark";
import GenreGem from '@components/Layout/GenreGem';
import DateFormatter from '@components/DateFormatter';
import StarRating from "@components/StarRating"


interface IHeaderProps {
  detail:any,
  loading:boolean
}

const DetailHeader:React.FC<IHeaderProps> = ({ detail, loading }) => {
  const pathType = usePathTypeCheck()

  return (
  <>
  <Fade in={!loading}>
    <Flex width={"100%"} height={"70vh"} position="absolute" top="0" left="0" zIndex="-10" >
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
      width={"100%"} height={"70vh"}
      position="relative"
      left="-12em"
      color="white"
      pt="3%">
      <InfoImage
        borderRadius={"md"}
        imageType={"poster"}
        width={"27%"}
        height={"75%"}
        imageSource={detail.poster_path}/>
      <VStack align="start" justify="space-between" spacing="3" width="25%" height="75%" ml="1em">
        <Flex direction="column">
          <Text fontWeight="bold" fontSize="3xl" mb={"3%"}>{detail.title||detail.name}</Text>
          { detail.tagline !== "" &&
            <Text as="cite" fontWeight="semibold" mt={1}>"{detail.tagline}"</Text> } 
        </Flex>
          <Flex direction="column" justify="start" width="100%"  >
          <Box width="100%">
            {detail.overview.length > 100 
              ? <Flex direction="column" align="start">
                  <Flex direction="row" justify="space-between" align="baseline">
                    <Text fontSize="lg" fontWeight="semibold">storyline</Text>
                    <ModalBox modalcontent={detail.overview}/> 
                  </Flex>
                  <Text >
                    {detail.overview.substring(0, 100)}...
                  </Text>
                </Flex>
              : <Box>
                  <Text>
                  {detail.overview}
                  </Text>
                </Box> }         
          </Box>
            <HStack justify="start"mt={1}>
              <VStack align="start">
                <Flex align="baseline">
                  <DateFormatter date={detail.release_date || detail.first_air_date} fontSize="xl"/>
                  <Text fontWeight="medium">({detail.status})</Text>
                </Flex>
                <Flex justify="start" align="center">
                  <StarRating rating={detail.vote_average}/>
                  <Text ml={2}>{detail.vote_average.toFixed(1)}/10</Text>
                  <BookMark 
                    bookMarkDetail={detail}
                    bookMarkType={pathType}
                    bookMarkId={detail.id}
                    />
                </Flex>
              </VStack>
            </HStack>
            <Flex align="center" justify="start" mt={2} pb={3}>
              {detail.genres.map((genre:any) => (
              <GenreGem
                genreId={genre.id}
                genreType={pathType}
              />))}
            </Flex>
          </Flex>
        </VStack>
      </Flex>
    </Fade>
  </>
  )
}


export default DetailHeader