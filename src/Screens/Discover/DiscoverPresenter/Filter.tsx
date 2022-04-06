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
  setDiscoverQuery,
  resetQuery,
  resetFilter,
  triggerRender,
  resetTrigger,
} from "@redux/discoverSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CollapseBox from "@components/Display/CollapseBox";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import { TuneIcon } from "@components/SvgIcons";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Flex,
  Grid,
  IconButton,
  chakra,
  useDisclosure,
  Button,
  useColorMode,
  RadioGroup,
  Radio,
  VStack,
  SlideFade,
} from "@chakra-ui/react";
import { useIconColor } from "@hooks/useIconColor";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MovieIcon, SeriesIcon } from "@components/SvgIcons";

export default function Filter() {
  const iconColor = useIconColor();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("1");
  const [orderDescending, setOrderDescending] = useState<boolean>(true);
  const [sortQuery, setSortQuery] = useState<string>("");
  const colorMode = useColorMode().colorMode;
  const path = usePathTypeCheck();

  const discoverGenres = useSelector(selectDiscoverInfoGenres);
  const filterList = useSelector(selectGenreFilters);
  const excludeFilter = useSelector(selectExcludeFilter);
  const includeFilter = useSelector(selectIncludeFilter);
  const excludeIds = useSelector(selectExcludeId);
  const includeIds = useSelector(selectIncludeId);

  interface IDiscoverGenre {
    info: IGenre;
    type: string;
  }

  const resetCondition = () => {
    dispatch(resetFilter());
    dispatch(resetQuery());
    dispatch(resetTrigger());
  };

  const toExClude = (info: IGenre) => {
    dispatch(removeFromFilter({ info, type: "include" }));
    dispatch(addToFilter({ info, type: "exclude" }));
  };

  const triggerSearch = () => {
    dispatch(
      setDiscoverQuery({
        sort: sortQuery,
        genreInclude: includeIds.toString(),
        genreExclude: excludeIds.toString(),
      })
    );
    dispatch(triggerRender());
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
  }, []);

  const SelectorContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "50%",
    },
  });

  const TypeSelector = chakra(Flex, {
    baseStyle: {
      fontSize: "xl",
      fontWeight: "semibold",
      align: "center",
      px: 3,
      borderRadius: "md",
    },
  });

  const GenreListContainer = chakra(Grid, {
    baseStyle: {
      gridTemplateColumns: "repeat(3,1fr)",
      justifyItems: "center",
      alignContent: "center",
      rowGap: 3,
      columnGap: 3,
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
      ml:2,
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

  const GenreContainer = chakra(Flex, {
    baseStyle: {
      alignItems: "center",
      justifyContent: "center",
      borderColor: iconColor,
      borderWidth: "1.5px",
      p: 1,
      mb: 3,
      rounded: "lg",
      width: "90%",
      wrap: "wrap",
    },
  });

  const GenreName = chakra(Text, {
    baseStyle: {
      fontSize: "sm",
      fontWeight: "thin",
      color: iconColor,
    },
  });

  return (
    <>
      <IconButton
        aria-label={"Filter"}
        icon={<TuneIcon color={iconColor} />}
        position={"absolute"}
        onClick={onOpen}
        right={"5"}
      />
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <SelectorContainer>
                <Link to="/discover/movie">
                  <TypeSelector
                    backgroundColor={
                      path === "movie"
                        ? colorMode === "light"
                          ? "gray.200"
                          : "gray.600"
                        : "transparent"
                    }
                    onClick={() => resetCondition()}
                  >
                    <MovieIcon color={iconColor} />
                    <Text ml={1} fontSize={"md"}>
                      Movies
                    </Text>
                  </TypeSelector>
                </Link>
                <Link to="/discover/series">
                  <TypeSelector
                    backgroundColor={
                      path === "series"
                        ? colorMode === "light"
                          ? "gray.200"
                          : "gray.600"
                        : "transparent"
                    }
                    onClick={() => resetCondition()}
                  >
                    <SeriesIcon color={iconColor} />
                    <Text ml={1} fontSize={"md"}>
                      Series
                    </Text>
                  </TypeSelector>
                </Link>
              </SelectorContainer>
              {discoverGenres.length > 0 && (
                <CollapseBox title="Genres">
                  <GenreListContainer>
                    {discoverGenres.map((genre: IGenre) => (
                      <>
                        {includeIds.includes(genre.id) === false &&
                          excludeIds.includes(genre.id) === false && (
                            <GenreContainer
                              onClick={() =>
                                dispatch(
                                  addToFilter({ info: genre, type: "include" })
                                )
                              }
                            >
                              <GenreName >{genre.name}</GenreName>
                            </GenreContainer>
                          )}

                        {includeIds.includes(genre.id) &&
                          excludeIds.includes(genre.id) === false && (
                            <GenreContainer
                              onClick={() => toExClude(genre)}
                              backgroundColor={colorMode === "light" ? "#49c480" : "#14c965"}
                            >
                              <GenreName color={"white"}>{genre.name}</GenreName>
                            </GenreContainer>
                          )}

                        {includeIds.includes(genre.id) === false &&
                          excludeIds.includes(genre.id) && (
                            <GenreContainer
                              backgroundColor={colorMode === "light" ? "red.400" : "#db4069"}
                              onClick={() =>
                                dispatch(
                                  removeFromFilter({
                                    info: genre,
                                    type: "exclude",
                                  })
                                )
                              }
                            >
                              <GenreName color={"white"}>{genre.name}</GenreName>
                            </GenreContainer>
                          )}
                      </>
                    ))}
                  </GenreListContainer>
                </CollapseBox>
              )}
            </>
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
                    Order Ascending
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
            <CollapseBox title={"Filters"}>
              <GenreFilterLayout>
                <VStack alignItems="start" ml={"2"}>
                  <Box>
                    <Text fontSize="sm" as="em">
                      Include
                    </Text>
                    <Flex
                      justifyContent="start"
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      {includeFilter.map((filter: IDiscoverGenre) => (
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
                    <Flex
                      justifyContent="start"
                      alignItems="center"
                      flexWrap="wrap"
                    >
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
          </ModalBody>

          <ModalFooter>
            <SlideFade in={filterList.length > 0}>
              <Flex justify="center" p={1}>
                <Button width="15vw" onClick={() => triggerSearch()}>
                  <Text>Discover</Text>
                </Button>
              </Flex>
            </SlideFade>
            <Button
              colorScheme={"gray.400"}
              mr={3}
              onClick={onClose}
              variant={"ghost"}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
