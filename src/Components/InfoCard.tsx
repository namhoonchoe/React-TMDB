import React from 'react'
import { Text ,Image,Box,Flex} from "@chakra-ui/react"

interface IInfoProps {
  title:string
  posterPath:string
 // rating:number
}


const InfoCard:React.FC<IInfoProps> =({title,posterPath})=> {
  return (
  <>
		<Flex 
		direction="column" 
		justify="start"
		align="center"
		my="2rem"
		borderTopRadius="md"
		boxSize="12rem"
		>
		<Box >
		  <Image 
		  boxSize="12rem"
		  height="30vh"
		  borderTopRadius="md"
		  src={`https://image.tmdb.org/t/p/w300${posterPath}`}/>
		</Box>
		<Box boxSize="12rem" my={1.5} px={1}
		  borderBottomRightRadius="md">
		  <Text fontSize="md" color="gray.300">
		    {title}
		  </Text>	
		</Box>
		</Flex>
  </>
  )
}


export default InfoCard