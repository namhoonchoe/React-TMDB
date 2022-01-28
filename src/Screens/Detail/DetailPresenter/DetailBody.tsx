import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Flex,
  VStack,
  Grid,
  GridItem,
  Box,
  Text,
  Button,
  SlideFade,
  useColorMode,
  Tooltip,
  chakra,
} from "@chakra-ui/react";
import CollapseSection from "@components/Layout/CollapseSection";
import InfoImage from "@components/Layout/InfoImage";
import DateFormatter from "@components/DateFormatter";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";

interface IBodyProps {
  detail: any;
  credits: any;
  similars: any;
}

const DetailBody: React.FC<IBodyProps> = ({ detail, credits, similars }) => {
  const pathType = usePathTypeCheck();
  const colorMode = useColorMode().colorMode;
  const [fullCast, setFullCast] = useState<boolean>(false);
  const [director, setDirector] = useState<any>(null);

  let history = useHistory();

  const toPerson = (path: string) => {
    history.push(path);
  };

  const CastingSection = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      mb: "5%",
      width: "100%",
    },
  });

  const CastingHeader = chakra(Flex, {
    baseStyle: {
      justifyContent: "space-between",
      alignItems: "baseline",
      mb: 3,
    },
  });

  const CastingInfoContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      justifyContent: "stretch",
      alignItems: "center",
      py: 1,
      pt: 3,
      width: "14.4rem",
      minHeight: "12rem",
      maxHeight: "max-content",
      borderRadius: "lg",
      _hover: {
        boxShadow: colorMode === "light" ? "xl" : "dark-lg",
      },
    },
  });

  const CastingContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 2,
      width: "100%",
    },
  });

  useEffect(() => {
    let mounted = true;
    const getDirector = () => {
      if (pathType === "movie") {
        const [director] = credits.crew.filter(
          (person: any) => person.job === "Director"
        );
        setDirector(director);
      }

      if (pathType === "series") {
        setDirector(detail.created_by[0]);
      }
    };

    if (mounted) {
      getDirector();
    }
    return () => {
      mounted = false;
      setDirector(null);
    };
  }, [credits.crew, detail.created_by, pathType]);

  return (
    <>
      {pathType !== "person" ? (
        <>
          <Flex direction="column" align="start" width="92vw">
            <Grid
              width="100%"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(6, 1fr)"
            >
              <GridItem rowSpan={2} colSpan={5}>
                <VStack align="start">
                  {/*casting*/}
                  {credits.cast !== null && credits.cast.length > 0 && (
                    <CastingSection>
                      <CastingHeader>
                        <Text fontSize="2xl" fontWeight="semibold">
                          Cast
                        </Text>
                        {credits.cast.length > 5 && (
                          <Button
                            backgroundColor="transparent"
                            onClick={() => setFullCast(!fullCast)}
                          >
                            {fullCast === true ? (
                              <Text
                                fontWeight="semibold"
                                fontSize={{ lg: "md", xl: "lg" }}
                              >
                                Collapse
                              </Text>
                            ) : (
                              <Text
                                fontWeight="semibold"
                                fontSize={{ lg: "md", xl: "lg" }}
                              >
                                See Full Cast
                              </Text>
                            )}
                          </Button>
                        )}
                      </CastingHeader>
                      {fullCast ? (
                        <SlideFade in={fullCast}>
                          <Grid
                            templateColumns="repeat(auto-fill,minmax(14.4rem, 1fr))"
                            gap="3"
                            width="100%"
                          >
                            {credits.cast.map((data: any) => (
                              <>
                                <CastingInfoContainer
                                  backgroundColor={
                                    colorMode === "light"
                                      ? "gray.200"
                                      : "gray.700"
                                  }
                                  key={data.id}
                                  onClick={() =>
                                    toPerson(`/profile/${data.id}`)
                                  }
                                >
                                  <InfoImage
                                    width="7rem"
                                    height="7rem"
                                    imageSource={data.profile_path}
                                    imageType="portrait"
                                    borderRadius="full"
                                  />
                                  <CastingContainer>
                                    <Text fontSize="sm" fontWeight="semibold">
                                      {data.name}
                                    </Text>
                                    {data.character !== "" && (
                                      <Flex
                                        direction="column"
                                        align="center"
                                        px={1}
                                      >
                                        <Text fontSize="xs">as</Text>
                                        <Flex
                                          justify="center"
                                          align="center"
                                          px={5}
                                        >
                                          {data.character.length > 20 ? (
                                            <Text
                                              fontSize="xs"
                                              fontWeight="semibold"
                                              textOverflow="ellipsis"
                                            >
                                              {data.character}
                                            </Text>
                                          ) : (
                                            <Text
                                              fontSize="sm"
                                              fontWeight="semibold"
                                            >
                                              {data.character}
                                            </Text>
                                          )}
                                        </Flex>
                                      </Flex>
                                    )}
                                  </CastingContainer>
                                </CastingInfoContainer>
                              </>
                            ))}
                          </Grid>
                        </SlideFade>
                      ) : (
                        <Grid
                          templateColumns="repeat(auto-fill,minmax(14.4rem, 1fr))"
                          gap="3"
                          width="100%"
                        >
                          {credits.cast.slice(0, 5).map((data: any) => (
                            <>
                              <CastingInfoContainer
                                backgroundColor={
                                  colorMode === "light"
                                    ? "gray.200"
                                    : "gray.700"
                                }
                                key={data.id}
                                onClick={() => toPerson(`/profile/${data.id}`)}
                              >
                                <InfoImage
                                  width="7rem"
                                  height="7rem"
                                  imageSource={data.profile_path}
                                  imageType="portrait"
                                  borderRadius="full"
                                />
                                <CastingContainer>
                                  <Text fontSize="sm" fontWeight="semibold">
                                    {data.name}
                                  </Text>
                                  {data.character !== "" && (
                                    <Flex
                                      direction="column"
                                      align="center"
                                      px={1}
                                    >
                                      <Text fontSize="xs">as</Text>
                                      <Flex
                                        justify="center"
                                        align="center"
                                        px={5}
                                      >
                                        {data.character.length > 20 ? (
                                          <Text
                                            fontSize="xs"
                                            fontWeight="semibold"
                                            textOverflow="ellipsis"
                                          >
                                            {data.character}
                                          </Text>
                                        ) : (
                                          <Text
                                            fontSize="sm"
                                            fontWeight="semibold"
                                          >
                                            {data.character}
                                          </Text>
                                        )}
                                      </Flex>
                                    </Flex>
                                  )}
                                </CastingContainer>
                              </CastingInfoContainer>
                            </>
                          ))}
                        </Grid>
                      )}
                    </CastingSection>
                  )}
                  {/*Similars*/}
                  {similars !== null && similars.length > 0 && (
                    <CollapseSection
                      title={
                        pathType === "movie"
                          ? "Similar Movies"
                          : "Similar Series"
                      }
                      sectionInfos={similars}
                      sectionInfoType={
                        pathType === "movie" ? "movie" : "series"
                      }
                    />
                  )}
                </VStack>
              </GridItem>
              {/*Futher Info */}
              <GridItem rowSpan={2} colSpan={1} ml={6}>
                <Text fontSize="2xl" mb={3} fontWeight="semibold">
                  Info
                </Text>
                <Flex
                  direction="column"
                  align="start"
                  justify="start"
                  fontSize={{ lg: "xs", xl: "md" }}
                >
                  <Flex direction="column" align="start">
                    <Text p={1} fontWeight="semibold">
                      Original Title
                    </Text>
                    <Text p={1}>
                      {detail.original_title || detail.original_name}
                    </Text>
                  </Flex>
                  {pathType === "movie" && (
                    <>
                      <Tooltip label="check Director's profile">
                        <Flex direction="column" align="start">
                          <Text p={1} fontWeight="semibold">
                            Director
                          </Text>
                          {director !== null && (
                            <Text
                              p={1}
                              as="cite"
                              onClick={() =>
                                toPerson(`/profile/${director.id}`)
                              }
                              _hover={{
                                backgroundColor: "blue.400",
                                color: "white",
                              }}
                              borderRadius="xl"
                            >
                              {director.name}
                            </Text>
                          )}
                        </Flex>
                      </Tooltip>
                      <Flex align="center">
                        <Text p={1} fontWeight="semibold">
                          Runtime
                        </Text>
                        <Text p={1} fontSize="sm">
                          {detail.runtime}'
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <Text p={1} fontWeight="semibold">
                          Release Date
                        </Text>
                        {detail.release_date !== null &&
                          detail.release_date !== undefined && (
                            <DateFormatter
                              date={detail.release_date}
                              fontSize="sm"
                              fontWeight="medium"
                            />
                          )}
                      </Flex>
                    </>
                  )}
                  {pathType === "series" && (
                    <>
                      {detail.created_by !== null &&
                        detail.created_by.length > 0 && (
                          <Tooltip label="check Director's profile">
                            <Flex direction="column" align="start">
                              <Text p={1} fontWeight="semibold">
                                Director
                              </Text>
                              {director !== null && (
                                <Text
                                  p={1}
                                  as="cite"
                                  onClick={() =>
                                    toPerson(`/profile/${director.id}`)
                                  }
                                  _hover={{
                                    backgroundColor: "blue.400",
                                    color: "white",
                                  }}
                                  borderRadius="xl"
                                >
                                  {director.name}
                                </Text>
                              )}
                            </Flex>
                          </Tooltip>
                        )}
                      <Flex align="center">
                        <Text p={1} fontWeight="semibold">
                          Episode Runtime
                        </Text>
                        <Flex align="center" wrap="wrap">
                          {detail.episode_run_time.map((runtime: any) => (
                            <Text p={1} fontSize="sm">
                              {runtime}'
                            </Text>
                          ))}
                        </Flex>
                      </Flex>
                      <Flex align="center">
                        <Text p={1} fontWeight="semibold">
                          Number of Seasons
                        </Text>
                        <Text p={1} fontSize="sm">
                          {detail.number_of_seasons}
                        </Text>
                      </Flex>
                      <Flex>
                        <Text p={1} fontWeight="semibold">
                          Number of Episodes
                        </Text>
                        <Text p={1} fontSize="sm">
                          {detail.number_of_episodes}
                        </Text>
                      </Flex>
                      {detail.first_air_date !== null &&
                        detail.first_air_date !== undefined && (
                          <Flex align="center">
                            <Text p={1} fontWeight="semibold">
                              First Air Date
                            </Text>
                            <DateFormatter
                              date={detail.first_air_date}
                              fontSize="sm"
                              fontWeight="medium"
                            />
                          </Flex>
                        )}
                      {detail.last_air_date !== null &&
                        detail.last_air_date !== undefined && (
                          <Flex align="center">
                            <Text p={1} fontWeight="semibold">
                              Last Air Date
                            </Text>
                            <DateFormatter
                              date={detail.last_air_date}
                              fontSize="sm"
                              fontWeight="medium"
                            />
                          </Flex>
                        )}
                    </>
                  )}
                  <Flex align="center">
                    <Text p={1} fontWeight="semibold">
                      Status
                    </Text>
                    <Text p={1} fontSize="sm">
                      {detail.status}
                    </Text>
                  </Flex>
                  <Flex align="center" justify="start">
                    <Text p={1} fontWeight="semibold">
                      Original Language
                    </Text>
                    <Box
                      px={2}
                      py={0.5}
                      mr={2}
                      boxSize="max-content"
                      borderRadius="xl"
                      backgroundColor={
                        colorMode === "light" ? "gray.200" : "gray.700"
                      }
                    >
                      <Text fontSize="sm">{detail.original_language}</Text>
                    </Box>
                  </Flex>
                  <Flex align="center" justify="start">
                    <Text p={1} fontWeight="semibold">
                      Language
                    </Text>
                    <Flex align="center">
                      {detail.spoken_languages.map((language: any) => (
                        <Box
                          px={2}
                          py={0.5}
                          mr={2}
                          boxSize="max-content"
                          borderRadius="xl"
                          backgroundColor={
                            colorMode === "light" ? "gray.200" : "gray.700"
                          }
                        >
                          <Text fontSize="sm"> {language.iso_639_1}</Text>
                        </Box>
                      ))}
                    </Flex>
                  </Flex>
                  {detail.revenue > 0 && (
                    <Flex align="center">
                      <Text p={1} fontWeight="semibold">
                        Revenue
                      </Text>
                      <Text p={1}>${detail.revenue}</Text>
                    </Flex>
                  )}
                </Flex>
              </GridItem>
            </Grid>
          </Flex>
        </>
      ) : null}
    </>
  );
};

export default DetailBody;
