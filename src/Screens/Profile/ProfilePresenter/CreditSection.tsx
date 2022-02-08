import React from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  VStack,
  Box,
  Text,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import InfoImage from "@components/Layout/InfoImage";
import GenreGem from "@components/Layout/GenreGem";
import StarRating from "@components/StarRating";
import DateFormatter from "@components/DateFormatter";

interface ICreditProps {
  creditData: Array<any>
  creditType: string;
  mediaType: string;
}

const CreditSection: React.FC<ICreditProps> = ({
  creditData,
  creditType,
  mediaType,
}) => {
  const colorMode = useColorMode().colorMode;

  const InfoLayout = chakra(Flex, {
    baseStyle: {
      width: "24rem",
      height: "18.6rem",
      alignItems: "start",
      px: 2,
      py: 1,
      borderRadius: "lg",
      _hover: {
        backgroundColor: colorMode === "light" ? "gray.200" : "gray.600",
      },
    },
  });

  const InfoContainer = chakra(VStack, {
    baseStyle: {
      p: 2,
      width: "11rem",
      alignItems: "start",
    },
  });

  const Title = chakra(Text, {
    baseStyle: {
      fontSize: "xs",
      fontWeight: "semibold",
    },
  });

  const CastingLayout = chakra(Flex, {
    baseStyle: {
      alignItems: "center",
      width: "11rem",
      wrap: "wrap",
    },
  });

  const CastingContainer = chakra(Flex, {
    baseStyle: {
      alignItems: "center",
      wrap: "wrap",
    },
  });

  const GenreContainer = chakra(Flex, {
    baseStyle: {
      alignItems: "center",
      justifyContent: "start",
      width: "11rem",
      flexWrap: "wrap",
    },
  });

  return (
    <>
      {creditData.length > 0 && (
        <>
          {creditData.map((data: any) => (
            <>
              {mediaType === "movie" && (
                <Link to={`/movie/${data.id}`} key={data.id}>
                  <InfoLayout>
                    <InfoImage
                      borderRadius={"lg"}
                      imageType={"poster"}
                      height={"18rem"}
                      width={"12rem"}
                      imageSource={data.poster_path}
                    />
                    <InfoContainer>
                      <Box width="11rem">
                        {data.title.length > 30 ? (
                          <>
                            {data.title.length > 40 ? (
                              <Title>{data.title.substring(0, 40)}...</Title>
                            ) : (
                              <Title>{data.title}</Title>
                            )}
                          </>
                        ) : (
                          <Title>{data.title}</Title>
                        )}
                      </Box>
                      {data.release_date !== "" && (
                        <DateFormatter
                          date={data.release_date}
                          fontWeight="medium"
                          fontSize="sm"
                        />
                      )}
                      <Flex alignItems="center">
                        <StarRating rating={data.vote_average} />
                        <Text ml={2} fontWeight="semibold">
                          {data.vote_average.toFixed(1)}/10
                        </Text>
                      </Flex>
                      {data.character !== "" &&
                        data.character !== null &&
                        creditType === "cast" && (
                          <CastingLayout>
                            {data.character.length > 20 ? (
                              <Flex alignItems="center" wrap="wrap">
                                <Text
                                  fontWeight="hairline"
                                  fontSize="sm"
                                  mr="1"
                                >
                                  as
                                </Text>
                                {data.character
                                  .split("/")
                                  .map((charactor: string) => (
                                    <Text
                                      fontSize="xs"
                                      fontWeight="semibold"
                                      mx={1}
                                    >
                                      {charactor}
                                    </Text>
                                  ))}
                              </Flex>
                            ) : (
                              <Flex alignItems="center" wrap="wrap">
                                <Text
                                  fontWeight="hairline"
                                  fontSize="sm"
                                  mr="1"
                                >
                                  as
                                </Text>
                                <Text fontSize="sm" fontWeight="semibold">
                                  {data.character}
                                </Text>
                              </Flex>
                            )}
                          </CastingLayout>
                        )}
                      {data.department !== "" && creditType === "crew" && (
                        <Flex alignItems="center" width="11rem">
                          <Text fontWeight="hairline" fontSize="sm" mr="1">
                            as
                          </Text>
                          <Text fontWeight="semibold" fontSize="sm">
                            {data.department}
                          </Text>
                        </Flex>
                      )}
                      {data.genre_ids !== undefined &&
                        data.genre_ids.length > 0 && (
                          <GenreContainer>
                            {data.genre_ids
                              .slice(0, 3)
                              .map((genreId: number) => (
                                <GenreGem
                                  genreId={genreId}
                                  genreType={"movie"}
                                  fontSize="xs"
                                />
                              ))}
                          </GenreContainer>
                        )}
                    </InfoContainer>
                  </InfoLayout>
                </Link>
              )}

              {mediaType === "series" && (
                <Link to={`/series/${data.id}`} key={data.id}>
                  <InfoLayout>
                    <InfoImage
                      borderRadius={"lg"}
                      imageType={"poster"}
                      height={"18rem"}
                      width={"12rem"}
                      imageSource={data.poster_path}
                    />
                    <InfoContainer>
                      <Box width="11rem">
                        {data.name.length > 30 ? (
                          <>
                            {data.name.length > 40 ? (
                              <Text fontSize="xs" fontWeight="semibold">
                                {data.name.substring(0, 40)}...
                              </Text>
                            ) : (
                              <Text fontSize="xs" fontWeight="semibold">
                                {data.name}
                              </Text>
                            )}
                          </>
                        ) : (
                          <Text fontSize="sm" fontWeight="semibold">
                            {data.name}
                          </Text>
                        )}
                      </Box>
                      {data.first_air_date !== "" &&
                        data.first_air_date !== undefined && (
                          <DateFormatter
                            date={data.first_air_date}
                            fontWeight="medium"
                            fontSize="sm"
                          />
                        )}
                      {data.vote_average !== "" &&
                        data.vote_average !== undefined && (
                          <Flex alignItems="center">
                            <StarRating rating={data.vote_average} />
                            <Text ml={2} fontWeight="semibold">
                              {data.vote_average.toFixed(1)}/10
                            </Text>
                          </Flex>
                        )}
                      {data.character !== "" &&
                        data.character !== null &&
                        creditType === "cast" && (
                          <CastingContainer>
                            <Text fontWeight="hairline" fontSize="sm" mr="1">
                              as
                            </Text>
                            {data.character.length > 20 ? (
                              <Text fontSize="sm" fontWeight="semibold">
                                {data.character}
                              </Text>
                            ) : (
                              <Text fontSize="xs" fontWeight="semibold">
                                {data.character}
                              </Text>
                            )}
                          </CastingContainer>
                        )}
                      {data.department !== "" && creditType === "crew" && (
                        <CastingContainer>
                          <Text fontWeight="hairline" fontSize="sm" mr="1">
                            as
                          </Text>
                          <Text fontWeight="semibold" fontSize="sm">
                            {data.department}
                          </Text>
                        </CastingContainer>
                      )}
                      {data.genre_ids.length !== 0 && (
                        <GenreContainer>
                          {data.genre_ids.slice(0, 3).map((genreId: number) => (
                            <GenreGem
                              genreId={genreId}
                              genreType={"series"}
                              fontSize="xs"
                            />
                          ))}
                        </GenreContainer>
                      )}
                    </InfoContainer>
                  </InfoLayout>
                </Link>
              )}
            </>
          ))}
        </>
      )}
    </>
  );
};

export default CreditSection;
