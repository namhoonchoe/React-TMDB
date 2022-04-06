import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDiscoverInfoList, fetchMore } from "@redux/discoverSlice";
import { Link } from "react-router-dom";
import { Text, Flex, Button, SlideFade, chakra } from "@chakra-ui/react";
import { AutoGridLayoutSm } from "@components/Display/BasicLayouts";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import InfoCard from "@components/Display/InfoCard";

const Main: React.FC = () => {
  const [sectionType, setSectionType] = useState<string | undefined>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const mainInfo = useSelector(selectDiscoverInfoList);
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

  const NextPage = chakra(Button, {
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
    dispatch(fetchMore());
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

    const skeletonController = () => {
      setIsLoaded(true);
    };

    if (mounted) {
      imageTypeChecker();
      skeletonController();
    }

    return () => {
      mounted = false;
      scrollToTop();
    };
  }, [pathType]);

  return (
    <DiscoverContainer>
      {mainInfo !== null && mainInfo.length > 0 && (
        <AutoGridLayoutSm>
          {mainInfo.map((data: any) => (
            <Link to={`/${sectionType}/${data.id}`}>
              <SlideFade in={isLoaded}>
                <InfoCard
                  key={data.id}
                  title={data.title || data.name}
                  posterPath={data.poster_path || data.profile_path}
                  rating={data.vote_average}
                />
              </SlideFade >
            </Link>
          ))}
        </AutoGridLayoutSm>
      )}
      <NextPage onClick={() => getNextPage()}>
        <Text>Next Page</Text>
      </NextPage>
    </DiscoverContainer>
  );
};

export default Main;
