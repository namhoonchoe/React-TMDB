import React from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../CarouselStyle.css"
import InfoCard from './InfoCard'

type CarouselData = []

interface ICarouselProps {
	carouselData:CarouselData
  dataType:string
	imageType:string
}

const CarouseSlider:React.FC<ICarouselProps> = ({ carouselData, dataType, imageType }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 6, 
    spacing: 1,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    }, 
  })

  function ArrowLeft(props:any) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
      <svg
        onClick={props.onClick}
        className={"arrow arrow--left" + disabeld}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      </svg>
    )
  }

  function ArrowRight(props:any) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
      <svg
        onClick={props.onClick}
        className={"arrow arrow--right" + disabeld}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      </svg>
    )
  }

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {carouselData.map((data:any) => (
          <div className="keen-slider__slide slide__content" key={data.id}>
          <Link to={`/${dataType}/${data.id}`}>
            <InfoCard
              carouselType={imageType}
              title={data.original_title||data.original_name||data.name}
              posterPath={data.poster_path||data.profile_path}
              rating={data.vote_average}/>
          </Link>
          </div>
          ))}
        </div>
      {slider && (
        <>
          <ArrowLeft
            onClick={(e:any) => e.stopPropagation() || slider.prev()}
            disabled={currentSlide === 0}
          />
          <ArrowRight
            onClick={(e:any) => e.stopPropagation() || slider.next()}
            disabled={currentSlide === slider.details().size - 1}
          />
        </>
        )}
      </div>
  
    </>
  );
};

export default CarouseSlider