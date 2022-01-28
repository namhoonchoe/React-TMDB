import React, { useState, useEffect } from "react";
import {
  selectDiscoverInfoGenres,
  selectGenreFilters,
  selectExcludeFilter,
  selectIncludeFilter,
  selectExcludeId,
  selectIncludeId,
  addToFilter,
  removeFromFilter,
  discoverTrigger,
  resetQuery,
  resetFilter,
} from "@redux/discoverSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import { useIconColor } from "@hooks/useIconColor";
import CollapseBox from "@components/Layout/CollapseBox";
import {
  Flex,
  Box,
  Text,
  Spacer,
  VStack,
  RadioGroup,
  Radio,
  Button,
  SlideFade,
  useColorMode,
  chakra,
} from "@chakra-ui/react";
import {
  MinusIcon,
  AddIcon,
  TriangleUpIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import MovieIcon from "@components/svgcomponents/MovieIcon";
import SeriesIcon from "@components/svgcomponents/SeriesIcon";

const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("1");
  const [orderDescending, setOrderDescending] = useState<boolean>(true);
  const [sortQuery, setSortQuery] = useState<string>("");
  const colorMode = useColorMode().colorMode;
  const iconColor = useIconColor();
  const path = usePathTypeCheck();

  const discoverGenres = useSelector(selectDiscoverInfoGenres);
  const filterList = useSelector(selectGenreFilters);
  const excludeFilter = useSelector(selectExcludeFilter);
  const includeFilter = useSelector(selectIncludeFilter);
  const excludeIds = useSelector(selectExcludeId);
  const includeIds = useSelector(selectIncludeId);

  const SidebarContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: "90vh",
      width: "90%",
      mt: "1em",
    },
  });

  const SelectorContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
    },
  });

  const TypeSelctor = chakra(Flex, {
    baseStyle: {
      fontSize: "xl",
      fontWeight: "semibold",
      align: "center",
      px: 3,
      borderRadius: "md",
    },
  });

  const FilterContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      p: 1,
      overflowX: "unset",
      overflowY: "auto",
    },
  });

  const GenreListContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      m: 2,
    },
  });

  const GenreBoxContainer = chakra(Flex, {
    baseStyle: {
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      width: "95%",
      m: 1,
      textColor: "gray.400",
    },
  });

  const GenreFilterLayout = chakra(Flex, {
    baseStyle: {
      alignItems: "center",
      width: "95%",
      m: 1,
    },
  });

  const GenreFilterContainer = chakra(Box, {
    baseStyle: {
      _hover: {
        backgroundColor: colorMode === "light" ? "gray.200" : "gray.600",
      },
      borderRadius: "xl",
      border: "2px",
      borderColor: colorMode === "light" ? "gray.400" : "gray.600",
      m: "0.1em",
    },
  });

  const OrderContainer = chakra(Flex, {
    baseStyle: {
      boxSize: "max-content",
      my: 3,
      justifyContent: "start",
      alignItems: "center",
    },
  });

  const ConditionLayout = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      alignItems: "start",
      p: 2,
    },
  });

  const ConditionContainer = chakra(Box, {
    baseStyle: {
      _hover: {
        backgroundColor: colorMode === "light" ? "gray.200" : "gray.600",
      },
      width: "3xs",
      borderRadius: "lg",
      px: 2,
      mb: 1,
    },
  });

  const resetTrigger = () => {
    dispatch(resetFilter());
    dispatch(resetQuery());
  };

  useEffect(() => {
    let mounted = true;

    const sort = () => {
      if (orderDescending) {
        switch (value) {
          case "4":
            setSortQuery("revenue.desc");
            break;
          case "3":
            setSortQuery("vote_average.desc");
            break;
          case "2":
            setSortQuery("release_date.desc");
            break;
          case "1":
            setSortQuery("popularity.desc");
            break;
        }
      } else {
        switch (value) {
          case "4":
            setSortQuery("revenue.asc");
            break;
          case "3":
            setSortQuery("vote_average.asc");
            break;
          case "2":
            setSortQuery("release_date.asc");
            break;
          case "1":
            setSortQuery("popularity.asc");
            break;
        }
      }
    };

    if (mounted) {
      sort();
    }

    return () => {
      mounted = false;
    };
  }, [value, orderDescending]);

  return (
    <SidebarContainer>
      <SelectorContainer>
        <Link to="/discover/movie">
          <TypeSelctor
            backgroundColor={
              path === "movie"
                ? colorMode === "light"
                  ? "gray.200"
                  : "gray.600"
                : "transparent"
            }
            onClick={() => resetTrigger()}
          >
            <MovieIcon color={iconColor} />
            <Text ml={1} fontSize={{ md: "sm", lg: "md", xl: "xl" }}>
              Movies
            </Text>
          </TypeSelctor>
        </Link>
        <Link to="/discover/series">
          <TypeSelctor
            backgroundColor={
              path === "series"
                ? colorMode === "light"
                  ? "gray.200"
                  : "gray.600"
                : "transparent"
            }
            onClick={() => resetTrigger()}
          >
            <SeriesIcon color={iconColor} />
            <Text ml={1} fontSize={{ md: "sm", lg: "md", xl: "xl" }}>
              Series
            </Text>
          </TypeSelctor>
        </Link>
      </SelectorContainer>
      <FilterContainer
        sx={{
          "&::-webkit-scrollbar": {
            width: "8px",
            borderRadius: "8px",
            backgroundColor: `rgba(0, 0, 0, 0.1)`,
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "8px",
            backgroundColor: `rgba(141,144, 150, 0.3)`,
          },
        }}
      >
        {discoverGenres !== null && discoverGenres.length > 0 && (
          <CollapseBox title="Genres">
            <GenreListContainer>
              {discoverGenres.map((genre: any) => (
                <GenreBoxContainer>
                  {includeIds.includes(genre.id) === false &&
                    excludeIds.includes(genre.id) === false && (
                      <>
                        <MinusIcon
                          onClick={() =>
                            dispatch(
                              addToFilter({ info: genre, type: "exclude" })
                            )
                          }
                        />
                        <Box>
                          <Text
                            fontSize={{ md: "xs", lg: "sm", xl: "md" }}
                            fontWeight="thin"
                            color="gray.600"
                          >
                            {genre.name}
                          </Text>
                        </Box>
                        <AddIcon
                          onClick={() =>
                            dispatch(
                              addToFilter({ info: genre, type: "include" })
                            )
                          }
                        />
                      </>
                    )}

                  {includeIds.includes(genre.id) &&
                    excludeIds.includes(genre.id) === false && (
                      <>
                        <MinusIcon
                          onClick={() =>
                            dispatch(
                              addToFilter({ info: genre, type: "exclude" })
                            )
                          }
                        />
                        <Box>
                          <Text
                            fontSize={{ md: "xs", lg: "sm", xl: "md" }}
                            fontWeight="thin"
                            color="gray.600"
                          >
                            {genre.name}
                          </Text>
                        </Box>
                        <AddIcon
                          onClick={() =>
                            dispatch(
                              removeFromFilter({
                                info: genre,
                                type: "include",
                              })
                            )
                          }
                          color="green.300"
                        />
                      </>
                    )}

                  {includeIds.includes(genre.id) === false &&
                    excludeIds.includes(genre.id) && (
                      <>
                        <MinusIcon
                          onClick={() =>
                            dispatch(
                              removeFromFilter({
                                info: genre,
                                type: "exclude",
                              })
                            )
                          }
                          color="red.300"
                        />
                        <Box>
                          <Text
                            fontSize={{ md: "xs", lg: "sm", xl: "md" }}
                            fontWeight="thin"
                            color="gray.600"
                          >
                            {genre.name}
                          </Text>
                        </Box>
                        <AddIcon
                          onClick={() =>
                            dispatch(
                              addToFilter({ info: genre, type: "include" })
                            )
                          }
                        />
                      </>
                    )}
                </GenreBoxContainer>
              ))}
            </GenreListContainer>
          </CollapseBox>
        )}
        {filterList !== null && (
          <CollapseBox title="Filters">
            <GenreFilterLayout>
              <VStack alignItems="start">
                <Box>
                  <Text fontSize="sm" as="em">
                    Include
                  </Text>
                  <Flex justifyContent="start" alignItems="center" flexWrap="wrap">
                    {includeFilter.map((filter: any) => (
                      <GenreFilterContainer
                        onClick={() =>
                          dispatch(
                            removeFromFilter({
                              info: filter.info,
                              type: "include",
                            })
                          )
                        }
                      >
                        <Text fontSize="md" fontWeight="light" mx={2} my={1}>
                          {filter.info.name}
                        </Text>
                      </GenreFilterContainer>
                    ))}
                  </Flex>
                </Box>
                <Box>
                  <Text fontSize="sm" as="em">
                    Exclude
                  </Text>
                  <Flex justifyContent="start" alignItems="center" flexWrap="wrap">
                    {excludeFilter.map((filter: any) => (
                      <GenreFilterContainer
                        onClick={() =>
                          dispatch(
                            removeFromFilter({
                              info: filter.info,
                              type: "exclude",
                            })
                          )
                        }
                      >
                        <Text fontSize="md" fontWeight="light" mx={2} my={1}>
                          {filter.info.name}
                        </Text>
                      </GenreFilterContainer>
                    ))}
                  </Flex>
                </Box>
              </VStack>
            </GenreFilterLayout>
          </CollapseBox>
        )}
        <CollapseBox title="Sort by">
          {orderDescending ? (
            <OrderContainer
              onClick={() => setOrderDescending(!orderDescending)}
            >
              <Text fontWeight="thin" py={1} pr={1} mr={2}>
                Order Descending
              </Text>
              <TriangleDownIcon />
            </OrderContainer>
          ) : (
            <OrderContainer
              onClick={() => setOrderDescending(!orderDescending)}
            >
              <Text fontWeight="thin" py={1} pr={1} mr={2}>
                Order Aescending
              </Text>
              <TriangleUpIcon />
            </OrderContainer>
          )}
          <RadioGroup onChange={setValue} value={value}>
            <ConditionLayout>
              <ConditionContainer>
                <Radio value="1">
                  <Text fontSize="md">Popularity</Text>
                </Radio>
              </ConditionContainer>
              <ConditionContainer>
                <Radio value="2">
                  <Text fontSize="md">Release Date</Text>
                </Radio>
              </ConditionContainer>
              <ConditionContainer>
                <Radio value="3">
                  <Text fontSize="md">Rating</Text>
                </Radio>
              </ConditionContainer>
              <ConditionContainer>
                <Radio value="4">
                  <Text fontSize="md">Revenue</Text>
                </Radio>
              </ConditionContainer>
            </ConditionLayout>
          </RadioGroup>
        </CollapseBox>
      </FilterContainer>
      <Spacer />
      <SlideFade in={filterList.length > 0}>
        <Flex justify="center" p={1}>
          <Button
            width="15vw"
            onClick={() =>
              dispatch(
                discoverTrigger({
                  sort: sortQuery,
                  genreInclude: includeIds.toString(),
                  genreExclude: excludeIds.toString(),
                })
              )
            }
          >
            <Text>Discover</Text>
          </Button>
        </Flex>
      </SlideFade>
    </SidebarContainer>
  );
};

export default SideBar;
