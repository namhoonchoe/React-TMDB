import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Box,Flex } from '@chakra-ui/layout';

interface ILandingProps {
	trendingMovies: null|Array<any>
	trendingSeries: null|Array<any>
}

interface IRandoms {
	randomNunber:number,
	randomIndex:number
}

const LandingPortal:React.FC<ILandingProps> = ({ trendingMovies, trendingSeries }) => {
	const [infoType, setInfoType] = useState<string>("movie")
	const [randNum, setRandNum] = useState<IRandoms>({
		randomNunber:1,
		randomIndex:1
	})
	const [selectedArray, setSelectedArray] = useState<null|Array<any>>(null)
	const [pickedInfo, setPickedInfo] = useState<any>(null)

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
				setSelectedArray(trendingMovies)
			}
		}

		const pickOne = (selectedArray:null|Array<any>) => {
			if(selectedArray !== null) {
				setPickedInfo(selectedArray[randNum.randomIndex])
			}
		}

		if(mounted){
			genRandNum(1,9)
			toggleState()
			pickOne(selectedArray)
		}

		return () => {
			mounted = false
			setInfoType("movie")
		}
	}
	, [selectedArray])
	return (
		<>
		{ pickedInfo !== null && selectedArray !== null &&
			<Link to={`/${infoType}/${pickedInfo.id}`}>
				<Flex
					width="100%"
					height="60vh"
					borderRadius="sm"
				>
				<Box
					borderRadius="sm"
					bgColor="#050000"										
					boxShadow="-20px 0px 5px 3px rgba(2, 3, 3,0.8) inset"
					opacity="0.9"
					width="25%"
					height="60vh"
					>
					
				</Box>
				<Box 
					width="75%"
					height="60vh"
					opacity="0.9"
					bgSize="cover"
					boxShadow="55px 2px 35px 3px rgba(2,2,4,1) inset"
					bgImage = {
						pickedInfo.backdrop_path !== null 
						? `https://image.tmdb.org/t/p/original${pickedInfo.backdrop_path}`
						: "none" }
					bgPosition="right 10% bottom 90%"
					borderRadius="sm"
					bgRepeat="no-repeat">
				</Box>       
				</Flex> 
			</Link>
		}
		</>
	)
}


export default LandingPortal