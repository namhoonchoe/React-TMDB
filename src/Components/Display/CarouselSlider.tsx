import React, { useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { motion, AnimatePresence } from "framer-motion";
import { chakra, Flex, IconButton } from '@chakra-ui/react';

const CarouselSlider:React.FC = ({children}) => {
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
      width: "94%",
      justifyContent: "start",
      alignItems: "start",
    },
  });

  const SliderWrapper = chakra(Flex, {
    baseStyle: {
      justifyContent: "start",
      alignItems: "center",
      width: "100%",
      height: "40vh",
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
        onClick={() => {
          scrollToR(sliderRef.current, 25, 250, -15);
        }}
      />
    </SliderWrapper>
  </AnimatePresence>
  )}


export default CarouselSlider