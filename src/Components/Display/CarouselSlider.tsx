import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { AnimatePresence } from "framer-motion";
import { chakra, Flex, IconButton, useColorMode } from "@chakra-ui/react";

interface ICarouselProps {
  wrapperHeight: any;
  buttonHeight?: string;
}

const CarouselSlider: React.FC<ICarouselProps> = ({
  children,
  wrapperHeight,
  buttonHeight,
}) => {
  const sliderRef = useRef(null) as any;
  const { colorMode } = useColorMode();
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
      zIndex: 10,
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

  const ButtonWrapper = chakra(Flex, {
    baseStyle: {
      justifyContent: "space-between",
      width: "100%",
      height: wrapperHeight,
      position: "absolute",
      top: 0,
      left: 0,
    },
  });

  const SliderButton = chakra(IconButton, {
    baseStyle: {
      color: colorMode === "light" ? "gray.700" : "white",
      _groupHover: {
        backgroundColor: colorMode === "light" ? "gray.800" : "gray.600",
        color: "white",
      },
      opacity: "0.8",
      height: buttonHeight,
      backgroundColor: "transparent",
      transition: "0.4s",
    },
  });

  return (
    <AnimatePresence>
      <SliderWrapper>
        <ButtonWrapper role={"group"}>
          <SliderButton
            aria-label={"To Left"}
            icon={<ChevronLeftIcon fontSize={"24px"} fontWeight={"semibold"} />}
            onClick={() => {
              scrollTol(sliderRef.current, 25, 250, -15);
            }}
            top={2}
            left={-10}
          />
          <SliderButton
            aria-label={"To right"}
            icon={
              <ChevronRightIcon fontSize={"24px"} fontWeight={"semibold"} />
            }
            onClick={() => {
              scrollToR(sliderRef.current, 25, 250, -15);
            }}
            top={2}
            left={5}
          />
        </ButtonWrapper>

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
      </SliderWrapper>
    </AnimatePresence>
  );
};

export default CarouselSlider;
