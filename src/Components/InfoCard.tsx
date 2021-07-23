import React, { useState, useEffect } from 'react'
import InfoImage from './InfoImage'
import { Text, Box, Flex } from "@chakra-ui/react"
import { useLocation } from "react-router-dom";


interface IInfoProps {
  title:string
	size?:string
	posterPath:string|undefined
  rating?:number
}



const InfoCard:React.FC<IInfoProps> =({title,posterPath,rating})=> {
	const [imageType, setImageType] = useState<string>("")
	let location = useLocation().pathname

	const imageTypeChecker = () => {
		if (location.includes("movie")){
      setImageType("poster")
    } else if(location.includes("tv")){
      setImageType("poster")
    } else if(location.includes("person")){
      setImageType("portrait")
    } 
	}
	
	useEffect(() => {
    imageTypeChecker()
    return () => {
      imageTypeChecker()
    }  
  },[])


  return (
  <>
		<Flex 
			direction="column" 
			borderRadius="md"
			width={"12em"} height={"20em"}
			mb={5}
			>
			<Box width={"12em"} height={"18em"}>
				<InfoImage 
					imageType={imageType}
					borderRadius = {"md"}
					imageSource={posterPath}/>
			</Box>
			<Flex flexWrap="wrap">
				<Text fontSize="md" color="gray.300" p="2px">
					{title}
				</Text>
			</Flex>
		</Flex>
  </>
  )
}


export default InfoCard