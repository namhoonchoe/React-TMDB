import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Fade,
  chakra,
} from "@chakra-ui/react";
import { GridLayout } from "@components/Display/BasicLayouts";
import CollapseSection from "@components/Display/CollapseSection";
import CarouselSlider from "@components/Display/CarouselSlider";
import DateFormatter from "@components/DateFormatter";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import CreditInfo from "./CreditInfo";

interface IBodyProps {
  detail: DetailInfo;
  credits: CreditInfo;
  similarContents: Array<IMovieSimilar> | Array<ISeriesSimilar>;
}

type director = IMovieDetailCrew | ICreator;

const DetailBody: React.FC<IBodyProps> = ({
  detail,
  credits,
  similarContents,
}) => {
  const pathType = usePathTypeCheck();
  const { colorMode } = useColorMode();
  const [fullCast, setFullCast] = useState<boolean>(false);
  const [director, setDirector] = useState<director | null>(null);

  let navigate = useNavigate();

  const toPerson = (path: string) => {
    navigate(path);
  };

  const DetailBodyContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      alignItems: "start",
      width: "92vw",
    },
  });

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

  const LanguageGem = chakra(Box, {
    baseStyle: {
      px: 2,
      py: 0.5,
      mr: 2,
      boxSize: "max-content",
      borderRadius: "xl",
      backgroundColor: colorMode === "light" ? "gray.200" : "gray.700",
    },
  });

  const DirectorName = chakra(Text, {
    baseStyle: {
      p: 1,
      as: "cite",
      _hover: {
        backgroundColor: "blue.400",
        color: "white",
      },
      borderRadius: "xl",
    },
  });

  interface IDetailsInfo {
    title: string;
  }

  const DetailInfoContainer: React.FC<IDetailsInfo> = ({ title, children }) => {
    return (
      <Flex direction="column" align="start">
        <Text p={1} fontWeight="semibold">
          {title}
        </Text>
        {children}
      </Flex>
    );
  };

  useEffect(() => {
    let mounted = true;
    const getDirector = () => {
      if (pathType === "movie") {
        const [director] = credits.crew.filter(
          (person: IMovieDetailCrew) => person.job === "Director"
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
        <DetailBodyContainer>
          <GridLayout>
            <GridItem rowSpan={2} colSpan={5}>
              <VStack alignItems="start">
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
                            <CreditInfo
                              id={data.id}
                              profilePath={data.profile_path}
                              name={data.name}
                              character={data.character}
                            />
                          ))}
                        </Grid>
                      </SlideFade>
                    ) : (
                      <Fade in={!fullCast}>
                        <CarouselSlider
                          wrapperHeight={{ lg: "30vh", xl: "25vh" }}
                          buttonHeight={"12rem"}
                        >
                          {credits.cast.map((data: any) => (
                            <Box mx={1.5}>
                              <CreditInfo
                                id={data.id}
                                profilePath={data.profile_path}
                                name={data.name}
                                character={data.character}
                              />
                            </Box>
                          ))}
                        </CarouselSlider>
                      </Fade>
                    )}
                  </CastingSection>
                )}
                {/*Similars*/}
                {similarContents !== null && similarContents.length > 0 && (
                  <CollapseSection
                    title={
                      pathType === "movie" ? "Similar Movies" : "Similar Series"
                    }
                    sectionInfos={similarContents}
                    sectionInfoType={pathType === "movie" ? "movie" : "series"}
                  />
                )}
              </VStack>
            </GridItem>
            {/*Futher Info */}
            <GridItem rowSpan={2} colSpan={1} pl={"5vw"}>
              <Text fontSize="2xl" mb={3} fontWeight="semibold">
                Info
              </Text>
              <Flex
                direction="column"
                align="start"
                justify="start"
                fontSize={{ lg: "xs", xl: "md" }}
              >
                <DetailInfoContainer title={"Original Title"}>
                  <Text p={1}>
                    {detail.original_title || detail.original_name}
                  </Text>
                </DetailInfoContainer>
                {pathType === "movie" && (
                  <>
                    {director && director !== null && (
                      <Tooltip label="check Director's profile">
                        <DetailInfoContainer title={"Director"}>
                          <Text p={1}>
                            <DirectorName
                              onClick={() =>
                                toPerson(`/profile/${director.id}`)
                              }
                            >
                              {director.name}
                            </DirectorName>
                          </Text>
                        </DetailInfoContainer>
                      </Tooltip>
                    )}

                    <DetailInfoContainer title={"Runtime"}>
                      <Text p={1} fontSize="sm">
                        {detail.runtime}'
                      </Text>
                    </DetailInfoContainer>
                    <DetailInfoContainer title={"Release Date"}>
                      {detail.release_date !== null &&
                        detail.release_date !== undefined && (
                          <DateFormatter
                            date={detail.release_date}
                            fontSize="sm"
                            fontWeight="medium"
                          />
                        )}
                    </DetailInfoContainer>
                  </>
                )}
                {pathType === "series" && (
                  <>
                    {detail.created_by !== null &&
                      detail.created_by.length > 0 && (
                        <Tooltip label="check Director's profile">
                          <DetailInfoContainer title={"Director"}>
                            {director && director !== null && (
                              <DirectorName
                                onClick={() =>
                                  toPerson(`/profile/${director.id}`)
                                }
                              >
                                {director.name}
                              </DirectorName>
                            )}
                          </DetailInfoContainer>
                        </Tooltip>
                      )}
                    <DetailInfoContainer title={"Episode Runtime"}>
                      <Flex align="center" wrap="wrap">
                        {detail.episode_run_time.map((runtime: any) => (
                          <Text p={1} fontSize="sm">
                            {runtime}'
                          </Text>
                        ))}
                      </Flex>
                    </DetailInfoContainer>
                    <DetailInfoContainer title={"Number of Seasons"}>
                      <Text p={1} fontSize="sm">
                        {detail.number_of_seasons}
                      </Text>
                    </DetailInfoContainer>
                    <DetailInfoContainer title={"Number of Episodes"}>
                      <Text p={1} fontSize="sm">
                        {detail.number_of_episodes}
                      </Text>
                    </DetailInfoContainer>
                    {detail.first_air_date !== null &&
                      detail.first_air_date !== undefined && (
                        <DetailInfoContainer title={"First Air Date"}>
                          <DateFormatter
                            date={detail.first_air_date}
                            fontSize="sm"
                            fontWeight="medium"
                          />
                        </DetailInfoContainer>
                      )}
                    {detail.last_air_date !== null &&
                      detail.last_air_date !== undefined && (
                        <DetailInfoContainer title={"Last Air Date"}>
                          <DateFormatter
                            date={detail.last_air_date}
                            fontSize="sm"
                            fontWeight="medium"
                          />
                        </DetailInfoContainer>
                      )}
                  </>
                )}
                <DetailInfoContainer title={"Status"}>
                  <Text p={1} fontSize="sm">
                    {detail.status}
                  </Text>
                </DetailInfoContainer>
                <DetailInfoContainer title={"Original Language"}>
                  <LanguageGem>
                    <Text fontSize="sm">{detail.original_language}</Text>
                  </LanguageGem>
                </DetailInfoContainer>
                <DetailInfoContainer title={"Language"}>
                  <Flex align="center">
                    {detail.spoken_languages.map(
                      (language: ISpokenLanguage) => (
                        <LanguageGem>
                          <Text fontSize="sm"> {language.iso_639_1}</Text>
                        </LanguageGem>
                      )
                    )}
                  </Flex>
                </DetailInfoContainer>
                {detail.revenue > 0 && (
                  <DetailInfoContainer title={"Revenue"}>
                    <Text p={1}>${detail.revenue}</Text>
                  </DetailInfoContainer>
                )}
              </Flex>
            </GridItem>
          </GridLayout>
        </DetailBodyContainer>
      ) : null}
    </>
  );
};

export default DetailBody;
