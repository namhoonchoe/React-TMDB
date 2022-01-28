import React from "react";
import BrokenPoster from "../svgcomponents/BrokenPoster";
import BrokenPortrait from "../svgcomponents/BrokenPortrait";
import { Image, Flex, useColorMode, chakra } from "@chakra-ui/react";

interface IImageProps {
  borderRadius: string;
  imageType?: string;
  height?: string;
  width?: string;
  imageSource: string | undefined | null;
}

const InfoImage: React.FC<IImageProps> = ({
  borderRadius,
  imageSource,
  imageType,
  height,
  width,
}) => {
  const colorMode = useColorMode().colorMode;
  const CenterBox = chakra(Flex, {
    baseStyle: {
      justifyContent: "center",
      alignItems: "center",
      width: width,
      height: height,
    },
  });

  return (
    <>
      {typeof imageSource === "string" && (
        <Image
          minWidth={width}
          height={height}
          borderRadius={borderRadius}
          src={`https://image.tmdb.org/t/p/w300${imageSource}`}
        />
      )}

      {imageType === "poster" && imageSource === undefined && (
        <CenterBox
          border="1px"
          borderColor="gray.300"
          borderRadius={borderRadius}
        >
          <BrokenPoster
            width={"3rem"}
            height={"3rem"}
            color={colorMode === "light" ? "#A0AEC0" : "#F7FAFC"}
          />
        </CenterBox>
      )}

      {imageType === "poster" && imageSource === null && (
        <CenterBox
          border="1px"
          borderColor="gray.300"
          borderRadius={borderRadius}
        >
          <BrokenPoster
            width={"3rem"}
            height={"3rem"}
            color={colorMode === "light" ? "#A0AEC0" : "#F7FAFC"}
          />
        </CenterBox>
      )}

      {imageType === "portrait" && imageSource === null && (
        <CenterBox border="none">
          <BrokenPortrait
            width={"3rem"}
            height={"3rem"}
            color={colorMode === "light" ? "#A0AEC0" : "#F7FAFC"}
          />
        </CenterBox>
      )}
    </>
  );
};

export default InfoImage;
