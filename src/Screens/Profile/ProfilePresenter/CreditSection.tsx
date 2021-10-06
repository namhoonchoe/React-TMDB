import React from 'react'
import { Link } from "react-router-dom";
import { Flex, VStack, Box, Text, useColorMode } from '@chakra-ui/react'
import InfoImage from '@components/Layout/InfoImage';
import GenreGem from '@components/Layout/GenreGem'
import StarRating from '@components/StarRating';
import DateFormatter from '@components/DateFormatter';

interface ICreditProps {
  creditData:any
  creditType:string
  mediaType:string
}

const CreditSection:React.FC<ICreditProps> = ({ creditData, creditType, mediaType }) => {
  const colorMode = useColorMode().colorMode

  return (
    <>
    { creditData !== null && creditData.length > 0 && 
    <>
    {creditData.map((data:any) => (
      <>
      { mediaType === "movie"  &&
      <Link to={`/movie/${data.id}`} key={data.id}>
      <Flex width="24rem" height="18.6rem" align="start" px={2} py={1} borderRadius="lg" _hover={{backgroundColor:colorMode === 'light' ? 'gray.200' : 'gray.600'}}>
        <InfoImage
          borderRadius={"lg"}
          imageType={"poster"}
          height={"18rem"}
          width={"12rem"}
          imageSource={data.poster_path}/>
        <VStack p={2} width="11rem" align="start">
          <Box width="11rem" >
          { data.title.length > 30 
					? <>{ data.title.length > 40 
						? <Text fontSize="xs" fontWeight="semibold">{data.title.substring(0,40)}...</Text>
						: <Text fontSize="xs" fontWeight="semibold">{data.title}</Text>
							}
						</>
					: <Text fontSize="sm" fontWeight="semibold">{data.title}</Text>
				}
          </Box>
          { data.release_date !== "" &&
            <DateFormatter date={data.release_date} fontWeight="medium" fontSize="sm"/> 
          }
          <Flex align="center">
            <StarRating rating={data.vote_average}/>
            <Text ml={2} fontWeight="semibold">{data.vote_average.toFixed(1)}/10</Text>
          </Flex>
          { data.character !== "" && data.character !== null && creditType === "cast" &&
            <Flex align="center" width="11rem" wrap="wrap">
              { data.character.length > 20
                ? <Flex align="center" wrap="wrap">
                    <Text fontWeight="hairline" fontSize="sm" mr="1">as</Text>
                    {data.character.split('/').map((charactor:string) => (
                      <Text fontSize="xs" fontWeight="semibold" mx={1}>{charactor}</Text>
                    ))}
                </Flex>
                : <Flex align="center" wrap="wrap">
                    <Text fontWeight="hairline" fontSize="sm" mr="1">as</Text>
                    <Text fontSize="sm" fontWeight="semibold">{data.character}</Text>
                  </Flex> 
            }
            </Flex> }
          { data.department !== "" && creditType === "crew" &&
            <Flex align="center" width="11rem">
              <Text fontWeight="hairline" fontSize="sm" mr="1">as</Text>
              <Text fontWeight="semibold" fontSize="sm">{data.department}</Text>
            </Flex>
          }
          { data.genre_ids !== undefined && data.genre_ids.length > 0 &&
            <Flex align="center" justify="start" width="11rem" flexWrap="wrap" >
              {data.genre_ids.slice(0,3).map((genreId:any) => (
              <GenreGem
                genreId={genreId}
                genreType={"movie"}
                fontSize="xs"
              />))}
            </Flex>
          }
        </VStack>
      </Flex> 
      </Link>
      }

      { mediaType === "series" && 
      <Link to={`/series/${data.id}`} key={data.id}>
      <Flex width="24.4rem" height="18.6rem" align="start" p={1} borderRadius="lg" _hover={{backgroundColor:colorMode === 'light' ? 'gray.200' : 'gray.600'}}>
        <InfoImage
          borderRadius={"lg"}
          imageType={"poster"}
          height={"18rem"}
          width={"12rem"}
          imageSource={data.poster_path}/>
        <VStack p={2} width="11rem" align="start">
          <Box width="11rem" >
          { data.name.length > 30
					? <>
            { data.name.length > 40 
						? <Text fontSize="xs" fontWeight="semibold">{data.name.substring(0,40)}...</Text>
						: <Text fontSize="xs" fontWeight="semibold">{data.name}</Text>
							}
						</>
					: <Text fontSize="sm" fontWeight="semibold">{data.name}</Text>
				}
          </Box>
          { data.first_air_date !== "" && data.first_air_date !== undefined  &&
            <DateFormatter date={data.first_air_date} fontWeight="medium" fontSize="sm"/> }
          { data.vote_average !== "" && data.vote_average !== undefined &&
            <Flex align="center">
              <StarRating rating={data.vote_average}/>
              <Text ml={2} fontWeight="semibold">{data.vote_average.toFixed(1)}/10</Text>
            </Flex>
          }
          { data.character !== "" && data.character !== null && creditType === "cast" &&
            <Flex align="center" width="11rem">
              <Text fontWeight="hairline" fontSize="sm" mr="1">as</Text>
              { data.character.length > 20
                ? <Text fontSize="sm" fontWeight="semibold">{data.character}</Text>
                : <Text fontSize="xs" fontWeight="semibold">{data.character}</Text>
              }
            </Flex> 
          }
          { data.department !== "" && creditType === "crew" &&
            <Flex align="center" width="11rem">
              <Text fontWeight="hairline" fontSize="sm" mr="1">as</Text>
              <Text fontWeight="semibold" fontSize="sm">{data.department}</Text>
            </Flex>
          }
          { data.genre_ids.length !== 0 &&
            <Flex align="center" justify="start" width="11rem" flexWrap="wrap" >
              {data.genre_ids.slice(0,3).map((genreId:any) => (
              <GenreGem
                genreId={genreId}
                genreType={"series"}
                fontSize="xs"
              />))}
            </Flex>
          }
      </VStack>
    </Flex>
    </Link>
      }
    </>
    ))}
    </>
    }
  </>)}


export default CreditSection