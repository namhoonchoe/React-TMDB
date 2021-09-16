import React, { useState, useEffect } from 'react'
import { Flex, Grid , GridItem, VStack, Box, Text, useColorMode } from '@chakra-ui/react'
import InfoImage from '@components/Layout/InfoImage';
import GenreGem from '@components/Layout/GenreGem'
import StarRating from '@components/StarRating';
import DateFormatter from '@components/DateFormatter';
import MovieIcon from '@components/svgcomponents/MovieIcon'
import SeriesIcon from '@components/svgcomponents/SeriesIcon'
import { useIconColor } from "@hooks/useIconColor";

interface IBodyProps {
  profileInfo:any
  movieCredits:any
  seriesCredits:any
}

const ProfileBody:React.FC<IBodyProps> = ({ profileInfo, movieCredits, seriesCredits }) => {
  const [creditType, setCreditType] = useState<string>("")
  const [isMovie, setIsMovie] = useState<boolean>(true)
  const colorMode = useColorMode().colorMode
  const iconColor = useIconColor()

  const toggleMediaType = () => {
    setIsMovie(!isMovie)
  }

  const getCast = () => {
    setCreditType("cast")
  }

  const getCrew = () => {
    setCreditType("crew")
  }

  useEffect(() => {
    let mounted = true;
    const checkCastType = () => {
      if(profileInfo.known_for_department === "Acting"){
        getCast()
      } else {
        getCrew()
      }
    }

    if(mounted) {
      checkCastType()
    } 

    return () => {
      mounted = false
    }
  },[])

  return (
    <>
      <Flex justify="center" width="100%">
      <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" width="100%" px="3%" pt="2%">
        <GridItem rowSpan={1} colSpan={1}>
          {/*Personal Info*/}
          <VStack align="start" justify="center" width="100%" mx={3} mt={2}>
            <Text fontSize="lg" fontWeight="semibold" my={1}>Personal Infos</Text>
            <Flex direction="column" align="start">
              <Text fontWeight="semibold" fontSize="md">Known For</Text>
              <Text fontSize="sm">{profileInfo.known_for_department}</Text>
            </Flex>
            { profileInfo.birthday !== null &&
              <Flex direction="column" align="start">
                <Text fontWeight="semibold" fontSize="md">Birthday</Text>
                <DateFormatter date={profileInfo.birthday} fontWeight="medium" fontSize="sm" />
              </Flex> }

            { profileInfo.place_of_birth !== null && 
              <Flex direction="column" align="start">
                <Text fontWeight="semibold" fontSize="md">Place of Birth </Text>
                <Text fontSize="sm">{profileInfo.place_of_birth}</Text>
              </Flex> }

            { profileInfo.also_known_as !== null && profileInfo.also_known_as.length > 0 && 
              <Flex direction="column" align="start">
                <Text fontWeight="semibold" fontSize="md">Also Known As </Text>
                <Flex direction="column">
                  {profileInfo.also_known_as.map((name:string) => (<>
                  <Text my="0.5" fontSize="sm">{name}</Text>
                  </>))}
                </Flex>
              </Flex> }
          </VStack>
        </GridItem>
        <GridItem  rowSpan={2} colSpan={4} >
          {/*Credits*/}
          <VStack width="100%" justify="center" px="1%">
            <Flex justify="space-between" align="center" width="100%" mb={"1%"}>
              <Flex align="center">
                <Box px={2} py={1} onClick={() => getCast()}
                      borderRadius="lg" backgroundColor={ creditType === "cast" ? "gray.200" : "transparent"}>
                  <Text fontWeight="semibold" fontSize="lg">Cast</Text>
                </Box>
                <Box px={2} py={1} onClick={() => getCrew()}
                      borderRadius="lg"backgroundColor={ creditType === "crew" ? "gray.200" : "transparent"}>
                  <Text fontWeight="semibold" fontSize="lg">Crew</Text>
                </Box>
              </Flex>
              { isMovie === true
                ? <Flex fontSize="xl" fontWeight="semibold" align="center" px={3} py={1.5} borderRadius="md"
                        backgroundColor={ colorMode==="light" ? "gray.200" :"gray.600" }
                        onClick={() => toggleMediaType()} >
                    <MovieIcon color={iconColor}/>
                    <Text ml={1}>Movies</Text>
                  </Flex>
                :  <Flex fontSize="xl" fontWeight="semibold"  align="center" px={3} py={1.5} borderRadius="md"
                        backgroundColor={ colorMode==="light" ? "gray.200" :"gray.600" }
                        onClick={() => toggleMediaType()} >
                      <SeriesIcon color={iconColor}/>
                      <Text ml={1}>Series</Text>
                    </Flex>
              }
            </Flex>
          { movieCredits.cast !== null && movieCredits.cast.length > 0 && 
            <Grid templateColumns="repeat(auto-fit,minmax(24rem, 1fr))" columnGap="1" rowGap="6" alignItems="start" width="100%" >
            {movieCredits.cast.slice(0,10).map((data:any) => (
              <Flex width="24rem" height="18.6rem" align="start" p="1" borderRadius="lg" _hover={{backgroundColor:"gray.200"}}>
                <InfoImage
                  borderRadius={"lg"}
                  imageType={"poster"}
                  height={"18rem"}
                  width={"12rem"}
                  imageSource={data.poster_path}/>
                <VStack p={2} width="11rem" align="start">
                  <Box width="11rem" >
                    { data.title.length > 20
                      ? <Text fontSize="sm" fontWeight="semibold">{data.title}</Text>
                      : <Text fontSize="md" fontWeight="semibold">{data.title}</Text>
                    }
                  </Box>
                  { data.release_date !== "" &&
                    <DateFormatter date={data.release_date} fontWeight="medium" fontSize="sm"/> }
                  <Flex align="center">
                    <StarRating rating={data.vote_average}/>
                    <Text ml={2} fontWeight="semibold">{data.vote_average.toFixed(1)}/10</Text>
                  </Flex>
                  { data.character !== "" &&
                    <Flex align="center" width="11rem">
                      <Text fontWeight="hairline" fontSize="sm" mr="1">as</Text>
                      <Text fontWeight="semibold" fontSize="sm">{data.character}</Text>
                    </Flex> }
                  <Flex align="center" justify="start" width="11rem" flexWrap="wrap" >
                    {data.genre_ids.map((genreId:any) => (
                    <GenreGem
                      genreId={genreId}
                      genreType={"movie"}
                      fontSize="xs"
                    />))}
                  </Flex>
                  
                </VStack>
              </Flex>
            ))}
            </Grid>}
          </VStack>
        </GridItem>
      </Grid> 
      </Flex>
    </>
  )
}


export default ProfileBody