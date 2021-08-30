import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Box, Flex, Text, Container, VStack, HStack, Skeleton } from '@chakra-ui/react';
import StarRating from "@components/StarRating"

interface ILandingProps {
	trendingMovies: null|Array<any>
	trendingSeries: null|Array<any>
}

interface IRandoms {
	randomNunber:number,
	randomIndex:number
}

const LandingPortal:React.FC<ILandingProps> = ({ trendingMovies, trendingSeries }) => {
	const [infoType, setInfoType] = useState<string>("")
	const [randNum, setRandNum] = useState<IRandoms>({
		randomNunber:1,
		randomIndex:1
	})
	const [selectedArray, setSelectedArray] = useState<null|Array<any>>(null)
	const [pickedInfo, setPickedInfo] = useState<any>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		let mounted = true
		const genRandNum = (min:number, max:number) => {
			min = Math.ceil(min);
			max = Math.floor(max);
			return setRandNum({ randomNunber:Math.floor(Math.random() * (max - min)) + min,
									randomIndex:Math.floor(Math.random()*20)})
		}

		const toggleState = () => {
			if(randNum.randomNunber%2 === 0){
				setInfoType("series")
				setSelectedArray(trendingSeries)
			} else {
				setInfoType("movie")
				setSelectedArray(trendingMovies)
			}
		}

		const pickOne = (selectedArray:null|Array<any>) => {
			if(selectedArray !== null) {
				setPickedInfo(selectedArray[randNum.randomIndex])
			}
		}
		
		const skeletonController = () => {
			setIsLoaded(true)
		}

		if(mounted){
			genRandNum(1,9)
			toggleState()
			pickOne(selectedArray)
			skeletonController()
		}

		return () => {
			mounted = false
		}
	}
	, [selectedArray])
	return (
		<>
		{ pickedInfo !== null && selectedArray !== null &&
			<Link to={`/${infoType}/${pickedInfo.id}`}>
			<Skeleton isLoaded={isLoaded}>
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
					<Flex Flex width={"100vw"} height={"75vh"} position="absolute" top="0" zIndex="-10">
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