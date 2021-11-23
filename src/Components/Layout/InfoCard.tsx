import React, { useState, useEffect } from 'react'
import InfoImage from './InfoImage'
import StarRating from '@components/StarRating'
import { Text, Flex, Box, Skeleton, Fade, useColorMode } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'


interface IInfoProps {
  title:string
	posterPath:string|undefined
  rating?:number
}

const InfoCard:React.FC<IInfoProps> =({ title, posterPath, rating })=> {
	const pathType = usePathTypeCheck()
	const colorMode = useColorMode().colorMode
	const [imageType, setImageType] = useState<string>("")
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		let mounted = true
		const imageTypeChecker = () => {
			if (pathType === "person") {
				setImageType("portrait")
			} else {
				setImageType("poster")
			}
		}
		
		const skeletonController = () => {
			setIsLoaded(true)
		}

		if(mounted) {
			imageTypeChecker()
			skeletonController()
		}

		return () => {
			mounted = false
		}

  },[pathType,colorMode])


  return (
  <>
		<Flex
			direction="column" 
			justify="start"
			align="center"
			borderRadius="lg"
			pt={1} mb={7}
			role="group"
			_hover={{backgroundColor:colorMode === 'light' ? 'gray.200' : 'gray.600'}}
			width={"12rem"}
			height={"19.4rem"}
			>
			<Skeleton isLoaded={isLoaded} startColor={ colorMode === 'light' ? 'gray.300' : 'gray.600'}>
			<Box width={"11em"} height={"15.4rem"} position="relative">
				<Box _groupHover={ pathType !== "person" ? {opacity:"0.1"} : {opacity:"1"}}>
				<InfoImage 
					width={"11rem"}
					height={"15.4rem"}
					imageType={imageType}
					borderRadius = {"md"}
					imageSource={posterPath}/>
				</Box>
				<>
				{rating !== undefined && 
					<Flex opacity="0" _groupHover={{opacity:"1"}} zIndex="10" position="absolute" top="0"
						direction="column" align="center" justify="center" width={"11rem"} height={"15.4rem"} >
						<Text fontWeight="semibold" mb={1}>User Score</Text>
						<Flex align="center">
							<StarRating rating={rating}/>
							<Text ml={2} fontWeight="semibold">{rating.toFixed(1)}/10</Text>
						</Flex>
					</Flex>}	
				</>
			</Box>
			</Skeleton>
			<Fade in={isLoaded} >
			<Flex width={"11rem"} justify="start" align="start" flexWrap="wrap" mt={2} px={1} >
					{ title.length > 30 
					? <>
						{ title.length > 50 
							? 
								<Text fontSize="xs" fontWeight="semibold">{title.substring(0,50)}...</Text>
							: 
								<Text fontSize="xs" fontWeight="semibold">{title}</Text>
						}
						</>
					:
						<Text fontSize="sm" fontWeight="semibold">{title}</Text>
				}
			</Flex>
			</Fade >
		</Flex>
  </>
  )
}

export default InfoCard