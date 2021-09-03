import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Box, Flex, Text, Container, VStack, HStack, Skeleton } from '@chakra-ui/react';
import StarRating from "@components/StarRating"

interface ILandingProps {
	trendingMovies: null|Array<any>
	trendingSeries: null|Array<any>
	mediaType:string
	randomIndex:number
	loading:boolean
}


const LandingPortal:React.FC<ILandingProps> = ({ trendingMovies, trendingSeries, mediaType, randomIndex, loading }) => {
	const [pickedInfo, setPickedInfo] = useState<any>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		let mounted = true

		const pickOne = () => {
			if(mediaType === "movie" && trendingMovies !== null) {
				setPickedInfo(trendingMovies[randomIndex])
			}

			if(mediaType === "series" && trendingSeries !== null) {
				setPickedInfo(trendingSeries[randomIndex])
			}
		}
		

		if(mounted){
			pickOne()
		}

		return () => {
			mounted = false
		}
	}
	, [mediaType,randomIndex])
	return (
		<>
		{ pickedInfo !== null && 
			<Link to={`/${mediaType}/${pickedInfo.id}`}>
			<Skeleton isLoaded={!loading}>
					{/* Info container */}
					<Flex
						align="start"
						borderRadius="sm"
						width={"100vw"} height={"75vh"}
						>
					<VStack color="white" pt={12} pl={4}>
						<Container >
              <Text fontWeight="semibold"  fontSize="3xl">
								{pickedInfo.original_title||pickedInfo.original_name}
							</Text>
            </Container>
						<Container >   
							<HStack justify="start">
                <Text mr={2}>{pickedInfo.release_date || pickedInfo.first_air_date}</Text>
                <Flex justify="start" align="center">
                  <StarRating rating={pickedInfo.vote_average}/>
									<Text ml={2}>{pickedInfo.vote_average}/10</Text>
                </Flex>
              </HStack>
							<Flex flexWrap="wrap">
							
              </Flex>
            </Container>
					</VStack>
					</Flex>
					{/* BackDrop Image container */}
					<Flex Flex width={"100vw"} height={"75vh"} position="absolute" top="0" left="0" zIndex="-10">
					<Box 
						width="100%"
						height="100%"
						bgSize="cover"
						bgColor="black"
						boxShadow="15px 2px 45px 3px rgba(2,2,4,1) inset"
						filter="brightness(85%)"
						bgImage = {
							pickedInfo.backdrop_path !== null 
							? `https://image.tmdb.org/t/p/original${pickedInfo.backdrop_path}`
							: "none" }
						bgPosition="2% 1%"
						borderRadius="sm"
						bgRepeat="no-repeat">
					</Box>       
					</Flex>
			</Skeleton>
			</Link>
		}
		</>
	)
}


export default LandingPortal