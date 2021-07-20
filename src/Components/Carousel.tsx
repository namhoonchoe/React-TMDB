import React from 'react'
import InfoCard from './InfoCard'
import { Box, Flex,Text } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'


type CarouselData = []

interface ICarouselProps {
	carouselData:CarouselData
}


const Carousel:React.FC<ICarouselProps> = ({carouselData}) => {
	return (
	<>
	<Flex direction="row" align="center" justify="start" m="1.4rem 0">
		<ChevronLeftIcon/>
			<Flex maxWidth="1440px" height="200px" justify="start" align="center" overflowX="clip">
				{carouselData.map((data:any) => (<InfoCard
        title={data.original_title||data.original_name||data.name}
        posterPath={data.poster_path||data.profile_path}
        rating={data.vote_average}
        />))}
			</Flex>
		<ChevronRightIcon/>
	</Flex>
	</>
	)
}


export default Carousel