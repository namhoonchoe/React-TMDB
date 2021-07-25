import React from 'react'
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
		slidesToShow: 6,
		slidesToScroll:6
	}	
	return (
		<>
		<Slider {...settings} >
			{carouselData.map((data:any) => (<InfoImage
			height={"18rem"}
			width={"12rem"}
			borderRadius={"md"}
			imageType={carouselType}
      imageSource={data.poster_path||data.profile_path}
    />))}
		</Slider>
		</>
	)
}


export default CarouseSlider