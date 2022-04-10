import React from "react";
import {
  chakra,
  Flex,
  VStack,
  HStack,
  Box,
  Text,
  Fade,
  useBreakpointValue,
} from "@chakra-ui/react";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import InfoImage from "@components/Display/InfoImage";
import ModalBox from "@components/Display/ModalBox";
import BookMark from "@components/BookMark";
import GenreGem from "@components/Display/GenreGem";
import DateFormatter from "@components/DateFormatter";
import StarRating from "@components/StarRating";

interface IHeaderProps {
  detail: DetailInfo;
  loading: boolean;
}

const DetailHeader: React.FC<IHeaderProps> = ({ detail, loading }) => {
  const pathType = usePathTypeCheck();
  const responsiveDate = useBreakpointValue({ lg: "md", xl: "lg" });

  const BackdropContainer = chakra(Flex, {
    baseStyle: {
      width: "100%",
      height: "70vh",
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "-10",
    },
  });

  const BackdropImage = chakra(Box, {
    baseStyle: {
      width: "100%",
      height: "100%",
      bgSize: "cover",
      bgColor: "black",
      boxShadow: `inset 25vw 0px 3vw black`,
      filter: "brightness(65%)",
      bgPosition: "20vw 5%",
      borderRadius: "sm",
      bgRepeat: "no-repeat",
    },
  });

  const InfoLayout = chakra(Flex, {
    baseStyle: {
      width: "90vw",
      height: "70vh",
      color: "white",
      position:"relative",
      justifyContent: "start",
      left: { lg: "-1.5vw", xl: "-1vw" },
      pt: "3%",
    },
  });

  const InfoContainer = chakra(VStack, {
    baseStyle: {
      alignItems: "start",
      justifyContent: "space-between",
      spacing: "3",
      width: "40%",
      height: "75%",
      ml: "2%",
    },
  });

  const GenreContainer = chakra(Flex, {
    baseStyle: {
      alignItems: "center",
      justifyTracks: "start",
      boxSize: "max-content",
      mt: 2,
      pb: 3,
    },
  });

  return (
    <Fade in={!loading}>
      <BackdropContainer>
        <BackdropImage
          bgImage={
            detail.backdrop_path !== null
              ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
              : "none"
          }
        />
      </BackdropContainer>
      <InfoLayout>
        <InfoImage
          borderRadius={"md"}
          imageType={"poster"}
          width={"15%"}
          height={"75%"}
          imageSource={detail.poster_path}
        />
        <InfoContainer>
          <Flex direction="column">
            {detail.title !== "" ||
            (detail.name !== "" && detail.title.length) ||
            detail.name.length > 20 ? (
              <Text fontWeight={"bold"} fontSize={"2xl"} mb={"3%"}>
                {detail.title || detail.name}
              </Text>
            ) : (
              <Text fontWeight={"bold"} fontSize={"xl"} mb={"3%"}>
                {detail.title || detail.name}
              </Text>
            )}

            {detail.tagline !== "" && (
              <Text
                as={"cite"}
                fontWeight={"semibold"}
                mt={1}
                fontSize={{ lg: "sm", xl: "md" }}
              >
                "{detail.tagline}"
              </Text>
            )}
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"start"}
            width={"100%"}
          >
            <Box width={"100%"}>
              {detail.overview.length > 100 ? (
                <Flex flexDirection="column" alignItems="start">
                  <Flex
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"baseline"}
                  >
                    <Text fontSize={"lg"} fontWeight={"semibold"}>
                      storyline
                    </Text>
                    <ModalBox modalContent={detail.overview} />
                  </Flex>
                  <Text>{detail.overview.substring(0, 100)}...</Text>
                </Flex>
              ) : (
                <Box>
                  <Text>{detail.overview}</Text>
                </Box>
              )}
            </Box>
            <HStack justifyContent={"start"} mt={1}>
              <VStack alignItems={"start"}>
                {detail.release_date !== null ||
                  undefined ||
                  detail.first_air_date !== null ||
                  (undefined && (
                    <Flex alignItems="baseline">
                      <DateFormatter
                        date={detail.release_date || detail.first_air_date}
                        fontSize={responsiveDate}
                      />
                      <Text
                        fontWeight="medium"
                        fontSize={{ lg: "md", xl: "lg" }}
                      >
                        ({detail.status})
                      </Text>
                    </Flex>
                  ))}
                <Flex justifyContent={"start"} alignItems={"center"}>
                  <StarRating rating={detail.vote_average} />
                  <Text ml={2}>{detail.vote_average.toFixed(1)}/10</Text>
                  <BookMark
                    bookMarkDetail={detail}
                    bookMarkType={pathType}
                    bookMarkId={detail.id}
                  />
                </Flex>
              </VStack>
            </HStack>
            <GenreContainer>
              {detail.genres.map((genre: IGenre) => (
                <GenreGem genreId={genre.id} key={genre.id} genreType={pathType} />
              ))}
            </GenreContainer>
          </Flex>
        </InfoContainer>
      </InfoLayout>
    </Fade>
  );
};

export default DetailHeader;
