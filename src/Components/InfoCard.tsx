import React from 'react'
import InfoImage from './InfoImage'
import { Text, Box, Flex } from "@chakra-ui/react"

interface IInfoProps {
  title:string
	size?:string
	imageType?:string
	posterPath:string|undefined
  rating?:number
}

const InfoCard:React.FC<IInfoProps> =({title,imageType,posterPath,rating})=> {
  return (
  <>
		<Flex 
			direction="column" 
			align="start"
			mb={8}
			maxW="xs"
			overflow="hidden"
			>
			<InfoImage 
				imageType={imageType}
				borderRadius = {"md"}
				imageSource={posterPath}/>
			<Box 
				height="1em" 
				fontSize="md" 
				color="gray.300"
				my="0.25em" px="1rem"
				borderBottomRightRadius="md">
				{title}
			</Box>
		</Flex>
  </>
  )
}


export default InfoCard