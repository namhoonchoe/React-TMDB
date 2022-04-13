import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDiscover, nextPage, prevPage } from "@redux/discoverSlice";
import { Link } from "react-router-dom";
import { Text, Flex, Button, chakra } from "@chakra-ui/react";
import { AutoGridLayoutSm } from "@components/Display/BasicLayouts";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import InfoCard from "@components/Display/InfoCard";
import { motion, AnimatePresence } from "framer-motion";

const Main: React.FC = () => {
  const [sectionType, setSectionType] = useState<string | undefined>("");
  const {
    discoverInfo: { discoverList },
    discoverQuery: { page },
  } = useSelector(selectDiscover);
  const pathType = usePathTypeCheck();

  const DiscoverContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "100%",
      mt: 2,
      px: 3,
    },
  });

  const PageButton = chakra(Button, {
    baseStyle: {
      size: "lg",
      my: 2,
      p: 3,
      alignSelf: "center",
      height: "max-content",
    },
  });

  const dispatch = useDispatch();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getNextPage = () => {
    dispatch(nextPage());
    scrollToTop();
  };

  const getPrevPage = () => {
    dispatch(prevPage());
    scrollToTop();
  };

  useEffect(() => {
    let mounted = true;
    const imageTypeChecker = () => {
      if (pathType === "movie") {
        setSectionType("movie");
      }
      if (pathType === "series") {
        setSectionType("series");
      }
    };

    if (mounted) {
      imageTypeChecker();
    }

    return () => {
      mounted = false;
      scrollToTop();
    };
  }, [pathType]);

  return (
    <DiscoverContainer>
      {discoverList !== null && discoverList.length > 0 && (
        <AutoGridLayoutSm>
          {discoverList.map((data: any) => (
            <Link to={`/${sectionType}/${data.id}`} key={data.id}>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <InfoCard
                    title={data.title || data.name}
                    posterPath={data.poster_path || data.profile_path}
                    rating={data.vote_average}
                  />
                </motion.div>
              </AnimatePresence>
            </Link>
          ))}
        </AutoGridLayoutSm>
      )}
      <Flex alignItems={"center"} justifyContent={"space-between"} mt={2}>
        {page > 1 && (
          <PageButton onClick={() => getPrevPage()} mr={2}>
            <Text>Prev Page</Text>
          </PageButton>
        )}
        <PageButton onClick={() => getNextPage()}>
          <Text>Next Page</Text>
        </PageButton>
      </Flex>
    </DiscoverContainer>
  );
};

export default Main;
