import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Box, Flex, Text, VStack, Skeleton } from '@chakra-ui/react';
import DateFormatter from '@components/DateFormatter';
import StarRating from "@components/StarRating"
import GenreGem from "@components/Layout/GenreGem"

interface ILandingProps {
	trendingMovies: null|Array<any>
	trendingSeries: null|Array<any>
	mediaType:string
	randomIndex:number
	loading:boolean
}


const LandingPortal:React.FC<ILandingProps> = ({ trendingMovies, trendingSeries, mediaType, randomIndex, loading }) => {
	const [pickedInfo, setPickedInfo] = useState<any>(null)

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
						width={"100%"} height={"75vh"}
						>
					<Flex direction="column" align="start" color="white" pt={12} pl={"5%"} height="100%">
            <Text fontWeight="semibold"  fontSize="3xl">
							{pickedInfo.title||pickedInfo.name}
						</Text>
						<Box height="45%"></Box>
						<VStack align="start">
							<Flex align="flex-end" mr={2}>
								{ mediaType === "movie" 
									? null
									: <Text mr={2} fontSize="md" fontWeight="semibold">Since</Text>}
									<DateFormatter date={pickedInfo.release_date || pickedInfo.first_air_date} fontSize="lg"/>
								</Flex>
							<Flex>
								<Text fontWeight="semibold" mr={2}>User Score</Text>
								<Flex justify="start" align="center" fontWeight="semibold">
                  <StarRating rating={pickedInfo.vote_average}/>
									<Text mx={1}>{pickedInfo.vote_average}/10</Text>
									<Text>({pickedInfo.vote_count})</Text>
									<Text ml={1}>votes</Text>
                </Flex>
							</Flex>
						</VStack>
						<Flex align="center" justify="start" boxSize="max-content" mt={4}>
							{pickedInfo.genre_ids.map((id:number) => (
              <GenreGem
                genreId={id}
                genreType={mediaType}/>))}
            </Flex>
					</Flex>
					</Flex>
					{/* BackDrop Image container */}
					<Flex width={"100%"} height={"75vh"} position="absolute" top="0" left="0" zIndex="-10">
					<Box 
						width="100%"
						height="100%"
						bgSize="cover"
						bgColor="black"
						boxShadow="15px 2px 45px 3px rgba(2,2,4,1) inset"
						filter="brightness(75%)"
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