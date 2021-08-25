import React, { useState, useEffect } from 'react'
import InfoImage from './InfoImage'
import { Text, Flex, Skeleton, SkeletonText, useColorMode } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'


interface IInfoProps {
  title:string
	carouselType?:string
	posterPath:string|undefined
  rating?:number
}

const InfoCard:React.FC<IInfoProps> =({ title, posterPath, carouselType })=> {
	const pathType = usePathTypeCheck()
	const colorMode = useColorMode().colorMode
	const [imageType, setImageType] = useState<string>("")
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const imageTypeChecker = () => {
			if (carouselType !== undefined) {
				setImageType(carouselType)
			} else {
				if (pathType === "person") {
					setImageType("portrait")
				} 
				
				else {
					setImageType("poster")
				}
			}
		}

		const skeletonController = () => {
			setIsLoaded(true)
		}

		imageTypeChecker()
		skeletonController()
  },[pathType,colorMode,carouselType])


  return (
  <>
		<Flex
			direction="column" 
			align="start"
			borderRadius="md"
			borderColor="gray.200"
			width={"10.5rem"} 
			mb={7}
			>
			<Skeleton isLoaded={isLoaded} startColor={ colorMode === 'light' ? 'gray.300' : 'gray.600'}>
			<InfoImage 
				width={"10.5rem"}
				height={"15rem"}
				imageType={imageType}
				borderRadius = {"md"}
				imageSource={posterPath}/>
			</Skeleton>
			<Flex flexWrap="wrap" >
				<SkeletonText isLoaded={isLoaded} startColor={ colorMode === 'light' ? 'gray.300' : 'gray.600'}>
				<Text fontSize="md" fontWeight="medium" m={1}>
					{title}
				</Text>
				</SkeletonText>
			</Flex>
		</Flex>
  </>
  )
}


export default InfoCard