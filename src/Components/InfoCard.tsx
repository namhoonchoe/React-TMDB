import React from 'react'
import { Text ,Image,Box,Flex} from "@chakra-ui/react"

interface IInfoProps {
  title:string
  posterPath:string
  rating:number
}

const InfoCard:React.FC<IInfoProps> =({title,posterPath,rating})=> {
  return (
  <>
		<Flex 
		direction="column" 
		justify="start"
		align="center"
		m="2rem 0 3rem 0 "
		borderTopRadius="md"
		boxSize="12rem"
		>
			<Box >
				<Image 
					boxSize="12rem"
					height="35vh"
					borderTopRadius="md"
					src={`https://image.tmdb.org/t/p/w300${posterPath}`}
				/>
			</Box>
			<Box 
			boxSize="12rem" my={1.5} px={1}
			borderBottomRightRadius="md">
				<Text 
					fontSize="md" 
					color="gray.300">
				{title}
				</Text>	
			</Box>
		</Flex>
  </>
  )
}


export default InfoCard