import React, { useState, useEffect } from "react";
import {
  selectGenreFilter,
  selectDiscover,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useIconColor } from "@hooks/useIconColor";
import { MovieIcon, SeriesIcon } from "@components/SvgIcons";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

export default function Filter() {
  const iconColor = useIconColor();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState<string>("1");
  const [orderDescending, setOrderDescending] = useState<boolean>(true);
  const [sortQuery, setSortQuery] = useState<string>("");
  const { colorMode } = useColorMode();
  const path = usePathTypeCheck();
  const dispatch = useDispatch();
  const {
    discoverInfo: { discoverGenres },
  } = useSelector(selectDiscover);

  interface IDiscoverGenre {
    info: IGenre;
    type: string;
  }

  const [genreFilters, setGenreFilters] = useState<Array<IDiscoverGenre>>([]);
  const includeGenre = genreFilters.filter(
    (filter) => filter.type === "include"
  );
  const excludedGenre = genreFilters.filter(
    (filter) => filter.type === "exclude"
  );

  const includedIds = genreFilters
    .filter((filter) => filter.type === "include")
    .map((genre) => genre.info["id"]);
  const excludeIds = genreFilters
    .filter((filter) => filter.type === "exclude")
    .map((genre) => genre.info["id"]);

  const toExclude = (genre: IGenre) => {
    setGenreFilters((genreFilters) =>
      genreFilters.filter((genreFilter) => genreFilter.info.id !== genre.id)
    );
    setGenreFilters((genreFilters) => [
      ...genreFilters,
      {
        info: genre,
        type: "exclude",
      },
    ]);
  };

  const resetCondition = () => {
    setGenreFilters([]);
    dispatch(resetFilter());
    dispatch(resetQuery());
    dispatch(resetTrigger());
  };

  const triggerDiscover = () => {
    dispatch(
      setDiscoverQuery({
        sort: sortQuery,
        genreInclude: includedIds.toString(),
        genreExclude: excludeIds.toString(),
        page:1
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
  }, [value, orderDescending]);

  const SelectorContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "row",
      justifyContent: "start",
      px: 2,
      fontSize: "lg",
      alignItems: "center",
      width: "50%",
    },
  });

  const TypeSelector = chakra(Flex, {
    baseStyle: {
      width: "7vw",
      fontSize: "xl",
      fontWeight: "semibold",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "md",
      p: 2,
      _hover: {
        backgroundColor: colorMode === "light" ? "gray.200" : "gray.600",
      },
      transition: "0.3s",
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
      ml: 2,
      px: 3,
      py: 2,
      borderRadius: "lg",
      justifyContent: "start",
      alignItems: "center",
      _hover: {
        backgroundColor: colorMode === "light" ? "gray.200" : "gray.600",
      },
      transition: "0.3s",
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
      transition: "0.3s",
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
        backgroundColor={"transparent"}
        transition={"0.3s"}
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
                <Text mr={2}>Discover</Text>
                {path === "movie" ? (
                  <Link to="/discover/series">
                    <TypeSelector
                      color={path === "movie" ? "blue.300" : iconColor}
                      onClick={() => resetCondition()}
                    >
                      <MovieIcon
                        color={path === "movie" ? "#63B3ED" : iconColor}
                      />
                      <Text ml={1} fontSize={"md"}>
                        Movies
                      </Text>
                    </TypeSelector>
                  </Link>
                ) : (
                  <Link to="/discover/movie">
                    <TypeSelector
                      color={path === "series" ? "blue.300" : iconColor}
                      onClick={() => resetCondition()}
                    >
                      <SeriesIcon
                        color={path === "series" ? "#63B3ED" : iconColor}
                      />
                      <Text ml={1} fontSize={"md"}>
                        Series
                      </Text>
                    </TypeSelector>
                  </Link>
                )}
              </SelectorContainer>
              {discoverGenres.length > 0 && (
                <CollapseBox title="Genres">
                  <GenreListContainer>
                    {discoverGenres.map((genre: IGenre) => (
                      <>
                        {includedIds.includes(genre.id) === false &&
                          excludeIds.includes(genre.id) === false && (
                            <GenreContainer
                              key={genre.id}
                              onClick={() =>
                                setGenreFilters((genreFilters) => [
                                  ...genreFilters,
                                  {
                                    info: genre,
                                    type: "include",
                                  },
                                ])
                              }
                              _hover={{
                                backgroundColor:
                                  colorMode === "light"
                                    ? "gray.200"
                                    : "gray.600",
                              }}
                            >
                              <GenreName>{genre.name}</GenreName>
                            </GenreContainer>
                          )}

                        {includedIds.includes(genre.id) &&
                          excludeIds.includes(genre.id) === false && (
                            <GenreContainer
                              key={genre.id}
                              onClick={() => toExclude(genre)}
                              backgroundColor={
                                colorMode === "light" ? "#49c480" : "#14c965"
                              }
                            >
                              <GenreName color={"white"}>
                                {genre.name}
                              </GenreName>
                            </GenreContainer>
                          )}

                        {includedIds.includes(genre.id) === false &&
                          excludeIds.includes(genre.id) && (
                            <GenreContainer
                              key={genre.id}
                              backgroundColor={
                                colorMode === "light" ? "red.400" : "#db4069"
                              }
                              onClick={() =>
                                setGenreFilters((genreFilters) =>
                                  genreFilters.filter(
                                    (genreFilter) =>
                                      genreFilter.info.id !== genre.id
                                  )
                                )
                              }
                            >
                              <GenreName color={"white"}>
                                {genre.name}
                              </GenreName>
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
                  <Text
                    fontWeight="thin"
                    py={1}
                    pr={1}
                    mr={2}
                    htmlFor="Descending"
                  >
                    Order Descending
                  </Text>
                  <TriangleDownIcon />
                </OrderContainer>
              ) : (
                <OrderContainer
                  onClick={() => setOrderDescending(!orderDescending)}
                >
                  <Text
                    fontWeight="thin"
                    py={1}
                    pr={1}
                    mr={2}
                    htmlFor="Ascending"
                  >
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
                      {includeGenre.map((genre: IDiscoverGenre, index) => (
                        <GenreFilterContainer
                          key={index}
                          onClick={() =>
                            setGenreFilters((genreFilters) =>
                              genreFilters.filter(
                                (genreFilter) =>
                                  genreFilter.info.id !== genre.info.id
                              )
                            )
                          }
                        >
                          <Text fontSize="md" fontWeight="light" mx={2} my={1}>
                            {genre.info.name}
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
                      {excludedGenre.map((genre: any, index) => (
                        <GenreFilterContainer
                          key={index}
                          onClick={() =>
                            setGenreFilters((genreFilters) =>
                              genreFilters.filter(
                                (genreFilter) =>
                                  genreFilter.info.id !== genre.info.id
                              )
                            )
                          }
                        >
                          <Text fontSize="md" fontWeight="light" mx={2} my={1}>
                            {genre.info.name}
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
            <SlideFade in={genreFilters.length > 0}>
              <Flex justify="center" p={1}>
                <Button width="10vw" onClick={() => triggerDiscover()}>
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
