import React from 'react'
import { Box, } from "@chakra-ui/react"
import InfoImage from './InfoImage'
import Slider ,{ Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type CarouselData = []

interface ICarouselProps {
	carouselData:CarouselData
	carouselType:string
}

const CarouseSlider:React.FC<ICarouselProps> = ({ carouselData, carouselType }) => {
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
					{carouselData.map((data:any) => (<InfoImage
					borderRadius={"sm"}
					imageType={carouselType}
          imageSource={data.poster_path||data.profile_path}
        />))}
				</Slider>
			</Box>
			
		</>
	)
}


export default CarouseSlider