import React from 'react'
import InfoCard from './InfoCard'
import { Flex } from "@chakra-ui/react"


type CarouselData =[]

interface ICarouselProps {
	carouselData:CarouselData
}


const Carousel:React.FC<ICarouselProps> = ({carouselData}) => {
	return (
	<>
	<Flex direction="row" align="center" mb={5}>
    {carouselData.map((data:any) => (<InfoCard
    title={data.original_title||data.original_name||data.name}
    posterPath={data.poster_path||data.profile_path}
    rating={data.vote_average}
    />))}
	</Flex>
	</>
	)
}


export default Carousel