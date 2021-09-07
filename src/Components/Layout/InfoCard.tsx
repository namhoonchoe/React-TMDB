import React, { useState, useEffect } from 'react'
import InfoImage from './InfoImage'
import { Text, Flex, Box, Skeleton, SkeletonText, useColorMode } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'


interface IInfoProps {
  title:string
	posterPath:string|undefined
  rating?:number
}

const InfoCard:React.FC<IInfoProps> =({ title, posterPath })=> {
	const pathType = usePathTypeCheck()
	const colorMode = useColorMode().colorMode
	const [imageType, setImageType] = useState<string>("")
	const [isLoaded, setIsLoaded] = useState(false)

	const NomalTitle = () => {
		return (
			<Text fontSize="sm" fontWeight="semibold" pl={0.5} mt={1}>
				{title}
			</Text>
		)
	}

	const ShortenedTitle = () => {
		return (
			<Text fontSize="sm" fontWeight="semibold" pl={0.5} mt={1}>
				{ title.substring(0,30)}...
			</Text>
		)
	}

	useEffect(() => {
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

		imageTypeChecker()
		skeletonController()
  },[pathType,colorMode])


  return (
  <>
		<Flex
			direction="column" 
			justify="start"
			align="center"
			borderRadius="lg"
			pt={3} mb={7}
			role="group"
			_hover={{backgroundColor:colorMode === 'light' ? 'gray.200' : 'gray.600'}}
			width={"11.6rem"}
			height={"19rem"}
			>
			<Skeleton isLoaded={isLoaded} startColor={ colorMode === 'light' ? 'gray.300' : 'gray.600'}>
			<Box _groupHover={{opacity:"0.2"}}>
			<InfoImage 
				width={"10.5rem"}
				height={"15rem"}
				imageType={imageType}
				borderRadius = {"md"}
				imageSource={posterPath}/>
			</Box>
			</Skeleton>
			<Flex width={"10.5rem"} justify="start" align="start" >
				<SkeletonText isLoaded={isLoaded} startColor={ colorMode === 'light' ? 'gray.300' : 'gray.600'}>
					{title.length > 30 
					?	<ShortenedTitle/>
					: <NomalTitle/>
					}
				</SkeletonText>
			</Flex>
		</Flex>
  </>
  )
}


export default InfoCard