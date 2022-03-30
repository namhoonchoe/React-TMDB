import React from "react";
import { BrokenPoster, BrokenPortrait } from "@components/SvgIcons";
import { Image, useColorMode, chakra } from "@chakra-ui/react";
import { CenteredBox } from "./BasicLayouts";

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

  const CenterBox = chakra(CenteredBox, {
    baseStyle: {
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
