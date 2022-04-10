import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, VStack, Skeleton, chakra } from "@chakra-ui/react";
import DateFormatter from "@components/DateFormatter";
import StarRating from "@components/StarRating";
import GenreGem from "@components/Display/GenreGem";
import { genreApi } from "@api";

interface IMovieData {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface ISeriesData {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: Array<string>;
  genre_ids: Array<number>;
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

interface ILandingProps {
  trendingMovies: Array<IMovieData>;
  trendingSeries: Array<ISeriesData>;
  mediaType: string;
  randomIndex: number;
  loading: boolean;
}

const LandingPortal: React.FC<ILandingProps> = ({
  trendingMovies,
  trendingSeries,
  mediaType,
  randomIndex,
  loading,
}) => {
  const [pickedInfo, setPickedInfo] = useState<any>({});

  const InfoLayout = chakra(Flex, {
    baseStyle: {
      alignItems: "start",
      borderRadius: "sm",
      width: "100%",
      height: "70vh ",
    },
  });

  const InfoContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      alignItems: "start",
      color: "white",
      pt: "12",
      pl: "5%",
      height: "100%",
    },
  });

  const GenreContainer = chakra(Flex, {
    baseStyle: {
      alignItems: "center",
      justifyContent: "start",
      boxSize: "max-content",
      mt: "4",
    },
  });

  const BackdropContainer = chakra(Flex, {
    baseStyle: {
      width: "100%",
      height: "75vh",
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
      boxShadow: `inset 1% 0px 1px black `,
      filter: "brightness(65%)",
      bgPosition: "2% 1%",
      borderRadius: "sm",
      bgRepeat: "no-repeat",
    },
  });

  useEffect(() => {
    let mounted = true;

    const pickOne = () => {
      if (mediaType === "movie" && trendingMovies !== null) {
        setPickedInfo(trendingMovies[randomIndex]);
      }

      if (mediaType === "series" && trendingSeries !== null) {
        setPickedInfo(trendingSeries[randomIndex]);
      }
    };

    if (mounted) {
      pickOne();
    }

    return () => {
      mounted = false;
    };
  }, [mediaType, randomIndex]);
  return (
    <>
      {pickedInfo !== null && (
        <Link to={`/${mediaType}/${pickedInfo.id}`}>
          <Skeleton isLoaded={!loading}>
            {/* Info container */}
            <InfoLayout>
              <InfoContainer>
                <Text fontWeight="semibold" fontSize="3xl">
                  {pickedInfo.title || pickedInfo.name}
                </Text>
                <Box height="45%"></Box>
                <VStack align="start">
                  <Flex align="flex-end" mr={2}>
                    {mediaType === "movie" ? null : (
                      <Text mr={2} fontSize="md" fontWeight="semibold">
                        Since
                      </Text>
                    )}
                    <DateFormatter
                      date={
                        pickedInfo.release_date || pickedInfo.first_air_date
                      }
                      fontSize="lg"
                    />
                  </Flex>
                  <Flex>
                    <Text fontWeight="semibold" mr={2}>
                      User Score
                    </Text>
                    <Flex
                      justifyContent="start"
                      alignItems="center"
                      fontWeight="semibold"
                    >
                      <StarRating rating={pickedInfo.vote_average} />
                      <Text mx={1}>{pickedInfo.vote_average}/10</Text>
                      <Text>({pickedInfo.vote_count})</Text>
                      <Text ml={1}>votes</Text>
                    </Flex>
                  </Flex>
                </VStack>
                <GenreContainer>
                  {pickedInfo.genre_ids && pickedInfo.genre_ids.map((id: number) => (
                    <GenreGem genreId={id} key={id} genreType={mediaType} />
                  ))}
                </GenreContainer>
              </InfoContainer>
            </InfoLayout>
            {/* BackDrop Image container */}
            <BackdropContainer>
              <BackdropImage
                bgImage={
                  pickedInfo.backdrop_path !== null
                    ? `https://image.tmdb.org/t/p/original${pickedInfo.backdrop_path}`
                    : "none"
                }
              />
            </BackdropContainer>
          </Skeleton>
        </Link>
      )}
    </>
  );
};

export default LandingPortal;
