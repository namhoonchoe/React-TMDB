import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { chakra, Flex, IconButton } from "@chakra-ui/react";

interface ICarouselProps {
  wrapperHeight: any;
  buttonHeight?:string
}

const CarouselSlider: React.FC<ICarouselProps> = ({
  children,
  wrapperHeight,
  buttonHeight
}) => {
  const sliderRef = useRef(null);

  const scrollToR = (
    element: any,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft -= step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const scrollTol = (
    element: any,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const Slider = chakra(Flex, {
    baseStyle: {
      overflowX: "scroll",
      width: "98%",
      justifyContent: "start",
      alignItems: "start",
    },
  });

  const SliderWrapper = chakra(Flex, {
    baseStyle: {
      justifyContent: "start",
      alignItems: "start",
      width: "100%",
      height: wrapperHeight,
      position: "relative",
    },
  });

  return (
    <AnimatePresence>
      <SliderWrapper>
        <IconButton
          aria-label={"To Left"}
          icon={<ChevronLeftIcon />}
          onClick={() => {
            scrollTol(sliderRef.current, 25, 250, -15);
          }}
          height={buttonHeight}
          backgroundColor={"transparent"}
          position={"absolute"}
          top={2}
          left={-10}
        />

        <Slider
          ref={sliderRef}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {children}
        </Slider>
        <IconButton
          aria-label={"To right"}
          icon={<ChevronRightIcon />}
          height={buttonHeight}
          onClick={() => {
            scrollToR(sliderRef.current, 25, 250, -15);
          }}
          backgroundColor={"transparent"}
          position={"absolute"}
          top={2}
          right={-5}
        />
      </SliderWrapper>
    </AnimatePresence>
  );
};

export default CarouselSlider;