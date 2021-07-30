import React, { useState, useEffect } from 'react'
import InfoImage from './InfoImage'
import { Text, Flex, VStack } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'


interface IInfoProps {
  title:string
	size?:string
	posterPath:string|undefined
  rating?:number
}



const InfoCard:React.FC<IInfoProps> =({title,posterPath,rating})=> {
	const pathType = usePathTypeCheck()
	const [imageType, setImageType] = useState<string>("")
	
	useEffect(() => {
		const imageTypeChecker = () => {
			if (pathType === "person") {
				setImageType("portrait")
			} else {
				setImageType("poster")
			}  
		}
    imageTypeChecker()
  },[pathType])


  return (
  <>
		<VStack 
			align="start"
			borderRadius="md"
			width={"14rem"} 
			mb={7}
			>
			<InfoImage 
				width={"14rem"}
				height={"20rem"}
				imageType={imageType}
				borderRadius = {"md"}
				imageSource={posterPath}/>
			<Flex flexWrap="wrap" >
				<Text fontSize="md" color="gray.300" p="2px">
					{title}
				</Text>
			</Flex>
		</VStack>
  </>
  )
}


export default InfoCard