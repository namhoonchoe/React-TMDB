import React, { useState, useEffect } from "react";
import InfoImage from "./InfoImage";
import StarRating from "@components/StarRating";
import {
  Text,
  Flex,
  Box,
  Skeleton,
  Fade,
  useColorMode,
  chakra,
} from "@chakra-ui/react";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";

interface IInfoProps {
  title: string;
  posterPath: string | null |undefined;
  rating?: number;
}

const InfoCard: React.FC<IInfoProps> = ({ title, posterPath, rating }) => {
  const pathType = usePathTypeCheck();
  const colorMode = useColorMode().colorMode;
  const [imageType, setImageType] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  const InfoContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      borderRadius: "lg",
      pt: "2",
      _hover: {
        backgroundColor: colorMode === "light" ? "gray.200" : "gray.600",
      },
      width: "12rem",
      height: "19.4rem",
    },
  });

  const RatingContainer = chakra(Flex, {
    baseStyle: {
      opacity: "0",
      _groupHover:{
        opacity:"1"
      },
      zIndex: "10",
      position: "absolute",
      top: "0",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "11rem",
      height: "15.4rem",
    },
  });

  const ImageContainer = chakra(Box, {
    baseStyle:{
      width:"11em",
      height:"15.4rem", 
      position:"relative"
    }
  })

  const TitleContainer = chakra(Flex, {
    baseStyle: {
      width: "11rem",
      justifyContent: "start",
      alignItems: "start",
      flexWrap: "wrap",
      mt: "2",
      px: "1",
    },
  });

  const TitleInfo = chakra(Text, {
    baseStyle:{
      fontSize:"xs" ,
      fontWeight:"semibold"
    }
  })

  useEffect(() => {
    let mounted = true;
    const imageTypeChecker = () => {
      if (pathType === "person") {
        setImageType("portrait");
      } else {
        setImageType("poster");
      }
    };

    const skeletonController = () => {
      setIsLoaded(true);
    };

    if (mounted) {
      imageTypeChecker();
      skeletonController();
    }

    return () => {
      mounted = false;
    };
  }, [pathType, colorMode]);

  return (
    <>
      <InfoContainer role={"group"}>
        <Skeleton
          isLoaded={isLoaded}
          startColor={colorMode === "light" ? "gray.300" : "gray.600"}
        >
          <ImageContainer>
            <Box
              _groupHover={
                pathType !== "person" ? { opacity: "0.1" } : { opacity: "1" }
              }
            >
              <InfoImage
                width={"11rem"}
                height={"15.4rem"}
                imageType={imageType}
                borderRadius={"md"}
                imageSource={posterPath}
              />
            </Box>
            <>
              {rating !== undefined && (
                <RatingContainer>
                  <Text fontWeight="semibold" mb={1}>
                    User Score
                  </Text>
                  <Flex align="center">
                    <StarRating rating={rating} />
                    <Text fontWeight="semibold" ml={2}>
                      {rating.toFixed(1)}/10
                    </Text>
                  </Flex>
                </RatingContainer>
              )}
            </>
          </ImageContainer>
        </Skeleton>
        <Fade in={isLoaded}>
          <TitleContainer>
            {title.length > 30 ? (
              <>
                {title.length > 50 ? (
                  <TitleInfo>
                    {title.substring(0, 50)}...
                  </TitleInfo>
                ) : (
                  <TitleInfo >
                    {title}
                  </TitleInfo>
                )}
              </>
            ) : (
              <TitleInfo>
                {title}
              </TitleInfo>
            )}
          </TitleContainer>
        </Fade>
      </InfoContainer>
    </>
  );
};

export default InfoCard;
