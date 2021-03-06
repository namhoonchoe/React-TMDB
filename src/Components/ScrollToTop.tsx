import React, { useState, useEffect } from "react";
import { Fade, chakra } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { CenteredBox } from "./Display/BasicLayouts";

const ScrollToTop: React.FC = () => {
  const [positionY, setPositionY] = useState<number>(0);

  const IconContainer = chakra(CenteredBox, {
    baseStyle: {
      borderRadius: "full",
      boxSize: "4rem",
      bgColor: "blue.400",
      position: "fixed",
      bottom: "5%",
      right: "1.5%",
      zIndex: "10",
    },
  });

  const onScroll = () => {
    setPositionY(window.scrollY);
  };

  const ToTheTop = () => {
    setPositionY(0);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {positionY < 400 ? null : (
        <Fade in={positionY >= 400}>
          <IconContainer>
            <ArrowUpIcon
              color="white"
              fontSize="2xl"
              fontWeight="extrabold"
              onClick={ToTheTop}
            />
          </IconContainer>
        </Fade>
      )}
    </>
  );
};

export default ScrollToTop;
