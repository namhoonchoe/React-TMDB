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
		my={8} 
		borderTopRadius="md"
		boxSize="12rem"
		>
			<Box >
				<Image 
				boxSize="12rem"
				borderTopRadius="md"
				src={`https://image.tmdb.org/t/p/w300${posterPath}`}/>
			</Box>
			<Box boxSize="12rem" my={1} px={1}
				borderBottomRightRadius="md">
				<Text 
					fontSize="sm"
					color="gray.500"
				>
					{title}
				</Text>	
			</Box>
		</Flex>
	</>
	)
}


export default InfoCard