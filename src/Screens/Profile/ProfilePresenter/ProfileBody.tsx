import React, { useState, useEffect } from 'react'
import CreditSection from './CreditSection';
import { Flex, Grid , GridItem, VStack, Box, Text, useColorMode } from '@chakra-ui/react'
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
          <VStack align="start" justify="center" width="100%" mx={3} mt={2} fontSize={{lg:"xs",xl:"md"}}>
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
                      borderRadius="lg" backgroundColor={ creditType === "cast" ?  colorMode==="light" ? "gray.200" :"gray.600"  : "transparent"}>
                  <Text fontWeight="semibold" fontSize="lg">Cast</Text>
                </Box>
                <Box px={2} py={1} onClick={() => getCrew()}
                      borderRadius="lg" backgroundColor={ creditType === "crew" ?  colorMode==="light" ? "gray.200" :"gray.600" : "transparent"}>
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
            <Grid templateColumns="repeat(auto-fit,minmax(22rem, 1fr))" columnGap="1" rowGap="6" 
                  alignItems="start" width="100%" pb={4}>
              <>
              { creditType === "cast"
                ? <CreditSection
                    creditData={isMovie === true ? movieCredits.cast : seriesCredits.cast }
                    creditType={creditType}
                    mediaType={isMovie ? "movie" : "series"}/>
                : <CreditSection
                    creditData={isMovie === true ? movieCredits.crew : seriesCredits.crew }
                    creditType={creditType}
                    mediaType={isMovie ? "movie" : "series"}/>
              }
              </>
            </Grid>
          </VStack>
        </GridItem>
      </Grid> 
      </Flex>
    </>
  )
}


export default ProfileBody