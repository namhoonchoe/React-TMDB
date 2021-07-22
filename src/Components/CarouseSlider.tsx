import React from 'react'
import { Box, } from "@chakra-ui/react"
import InfoCard from './InfoCard'
import Slider ,{ Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type CarouselData = []

interface ICarouselProps {
	carouselData:CarouselData
}

const CarouseSlider:React.FC<ICarouselProps> = ({carouselData}) => {
	const settings:Settings = {
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 5,
		slidesToScroll:5
	}	
	return (
		<>
			<Box> 
				<Slider {...settings} >
					{carouselData.map((data:any) => (<InfoCard
					size="6rem"
          title={data.original_title||data.original_name||data.name}
          posterPath={data.poster_path||data.profile_path}
          rating={data.vote_average}
        />))}
				</Slider>
			</Box>
			
		</>
	)
}


export default CarouseSlider