import React, { useState, useEffect } from 'react'
import InfoImage from './InfoImage'
import { Text, Flex } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'


interface IInfoProps {
  title:string
	size?:string
	posterPath:string|undefined
  rating?:number
}

const InfoCard:React.FC<IInfoProps> =({ title, posterPath, rating })=> {
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
		<Flex
			direction="column" 
			align="start"
			borderRadius="md"
			borderColor="gray.200"
			width={"10.5rem"} 
			mb={7}
			>
			<InfoImage 
				width={"10.5rem"}
				height={"15rem"}
				imageType={imageType}
				borderRadius = {"md"}
				imageSource={posterPath}/>
			<Flex flexWrap="wrap" >
				<Text fontSize="md" fontWeight="medium" p={1}>
					{title}
				</Text>
			</Flex>
		</Flex>
  </>
  )
}


export default InfoCard