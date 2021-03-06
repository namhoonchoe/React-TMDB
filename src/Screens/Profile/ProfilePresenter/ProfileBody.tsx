import React, { useState, useEffect } from "react";
import CreditSection from "./CreditSection";
import {
  Flex,
  Grid,
  GridItem,
  VStack,
  Box,
  Text,
  useColorMode,
  chakra,
} from "@chakra-ui/react";
import { GridLayout } from "@components/Display/BasicLayouts";
import DateFormatter from "@components/DateFormatter";
import { MovieIcon, SeriesIcon } from "@components/SvgIcons";
import { useIconColor } from "@hooks/useIconColor";

interface IBodyProps {
  profileInfo: IPersonDetail;
  movieCredits: IMovieCreditInfo;
  seriesCredits: ISeriesCreditInfo;
}

const ProfileBody: React.FC<IBodyProps> = ({
  profileInfo,
  movieCredits,
  seriesCredits,
}) => {
  const [creditType, setCreditType] = useState<string>("");
  const [isMovie, setIsMovie] = useState<boolean>(true);
  const colorMode = useColorMode().colorMode;
  const iconColor = useIconColor();

  const PersonalInfoLayout = chakra(VStack, {
    baseStyle: {
      alignItems: "start",
      justify: "center",
      width: "100%",
      mx: 3,
      mt: 2,
      fontSize: { lg: "xs", xl: "md" },
    },
  });

  const PersonalInfoContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      alignItems: "start",
    },
  });

  const NavContainer = chakra(Flex, {
    baseStyle: {
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      mb: "1%",
    },
  });

  const RoleSelector = chakra(Box, {
    baseStyle: {
      px: 2,
      py: 1,
      borderRadius: "lg",
    },
  });

  const TypeSelector = chakra(Flex, {
    baseStyle: {
      fontSize: "xl",
      fontWeight: "semibold",
      alignItems: "center",
      px: 3,
      py: 1.5,
      borderRadius: "md",
      backgroundColor: colorMode === "light" ? "gray.200" : "gray.600",
    },
  });

  const CreditGrid = chakra(Grid, {
    baseStyle: {
      gridTemplateColumns: `repeat(auto-fit,minmax(22rem, 1fr))`,
      gridColumnGap: "1",
      gridRowGap: "6",
      alignContent: "start",
      width: "100%",
      pb: 4,
    },
  });

  const toggleMediaType = () => {
    setIsMovie(!isMovie);
  };

  const getCast = () => {
    setCreditType("cast");
  };

  const getCrew = () => {
    setCreditType("crew");
  };

  useEffect(() => {
    let mounted = true;
    const checkCastType = () => {
      if (profileInfo.known_for_department === "Acting") {
        getCast();
      } else {
        getCrew();
      }
    };

    if (mounted) {
      checkCastType();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Flex justifyContent="center" width="100%">
        <GridLayout px={"3%"} pt={"2%"}>
          <GridItem rowSpan={1} colSpan={1}>
            {/*Personal Info*/}
            <PersonalInfoLayout>
              <Text fontSize="lg" fontWeight="semibold" my={1}>
                Personal Infos
              </Text>
              <PersonalInfoContainer>
                <Text fontWeight="semibold" fontSize="md">
                  Known For
                </Text>
                <Text fontSize="sm">{profileInfo.known_for_department}</Text>
              </PersonalInfoContainer>
              {profileInfo.birthday !== null && (
                <PersonalInfoContainer>
                  <Text fontWeight="semibold" fontSize="md">
                    Birthday
                  </Text>
                  <DateFormatter
                    date={profileInfo.birthday}
                    fontWeight="medium"
                    fontSize="sm"
                  />
                </PersonalInfoContainer>
              )}
              {profileInfo.place_of_birth !== null && (
                <PersonalInfoContainer>
                  <Text fontWeight="semibold" fontSize="md">
                    Place of Birth
                  </Text>
                  <Text fontSize="sm">{profileInfo.place_of_birth}</Text>
                </PersonalInfoContainer>
              )}

              {profileInfo.also_known_as !== null &&
                profileInfo.also_known_as.length > 0 && (
                  <PersonalInfoContainer>
                    <Text fontWeight="semibold" fontSize="md">
                      Also Known As
                    </Text>
                    <Flex direction="column">
                      {profileInfo.also_known_as.map((name: string, index) => (
                          <Text my="0.5" fontSize="sm" key={index}> 
                            {name}
                          </Text>
                      ))}
                    </Flex>
                  </PersonalInfoContainer>
                )}
            </PersonalInfoLayout>
          </GridItem>
          <GridItem rowSpan={2} colSpan={5}>
            {/*Credits*/}
            <VStack width="100%" justify="center" px="1%">
              <NavContainer>
                <Flex alignItems="center">
                  <RoleSelector
                    backgroundColor={
                      creditType === "cast"
                        ? colorMode === "light"
                          ? "gray.200"
                          : "gray.600"
                        : "transparent"
                    }
                    onClick={() => getCast()}
                  >
                    <Text fontWeight="semibold" fontSize="lg">
                      Cast
                    </Text>
                  </RoleSelector>
                  <RoleSelector
                    backgroundColor={
                      creditType === "crew"
                        ? colorMode === "light"
                          ? "gray.200"
                          : "gray.600"
                        : "transparent"
                    }
                    onClick={() => getCrew()}
                  >
                    <Text fontWeight="semibold" fontSize="lg">
                      Crew
                    </Text>
                  </RoleSelector>
                </Flex>
                {isMovie === true ? (
                  <TypeSelector onClick={() => toggleMediaType()}>
                    <MovieIcon color={iconColor} />
                    <Text ml={1}>Movies</Text>
                  </TypeSelector>
                ) : (
                  <TypeSelector onClick={() => toggleMediaType()}>
                    <SeriesIcon color={iconColor} />
                    <Text ml={1}>Series</Text>
                  </TypeSelector>
                )}
              </NavContainer>
              
                <CreditGrid>
                  {creditType === "cast" ? (
                    <CreditSection
                      creditData={
                        isMovie === true
                          ? movieCredits.cast
                          : seriesCredits.cast
                      }
                      creditType={creditType}
                      mediaType={isMovie ? "movie" : "series"}
                    />
                  ) : (
                    <CreditSection
                      creditData={
                        isMovie === true
                          ? movieCredits.crew
                          : seriesCredits.crew
                      }
                      creditType={creditType}
                      mediaType={isMovie ? "movie" : "series"}
                    />
                  )}
                </CreditGrid>
            </VStack>
          </GridItem>
        </GridLayout>
      </Flex>
    </>
  );
};

export default ProfileBody;
