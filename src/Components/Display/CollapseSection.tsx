import React, { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import { Link } from "react-router-dom";
import {
  Button,
  IconButton,
  chakra,
  Text,
  Flex,
  Grid,
  SlideFade ,
  Fade,
} from "@chakra-ui/react";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import CarouselSlider from "./CarouselSlider";

interface ICollapseSectionProps {
  title: string;
  sectionInfoType?: string;
  sectionInfos: Array<any>;
}

const CollapseSection: React.FC<ICollapseSectionProps> = ({
  title,
  sectionInfos,
  sectionInfoType,
}) => {
  const [seeAll, setSeeAll] = useState<boolean>(false);
  const [sectionType, setSectionType] = useState<string | undefined>("");
  const pathType = usePathTypeCheck();

  const toggleView = () => {
    setSeeAll(!seeAll);
  };

  const CollapseControl = chakra(Flex, {
    baseStyle: {
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      my: "2",
    },
  });

  const GridSection = chakra(Grid, {
    baseStyle: {
      gridTemplateColumns: `repeat(auto-fill,minmax(14rem, 1fr))`,
      justifyContent: "center",
      alignContent:"start",
      width: "100%",
    },
  });

  useEffect(() => {
    let mounted = true;

    const imageTypeChecker = () => {
      if (pathType === "movie") {
        setSectionType("movie");
      }
      if (pathType === "series") {
        setSectionType("series");
      }
      if (pathType === "person") {
        setSectionType("person");
      }
      if (pathType === "search") {
        setSectionType(sectionInfoType);
      }
      if (pathType === "bookmark") {
        setSectionType(sectionInfoType);
      }
    };

    if (mounted) {
      imageTypeChecker();
    }

    return () => {
      mounted = false;
    };
  }, [pathType, sectionInfoType]);

  return (
    <Flex direction={"column"} width="100%" height={"max-content"}>
      <CollapseControl>
        <Text fontSize="2xl" mb={3} fontWeight="semibold">
          {title}
        </Text>
        {seeAll ? (
          <Button onClick={() => toggleView()} backgroundColor="transparent">
            <Text fontSize={{ lg: "md", xl: "lg" }}>Collapse </Text>
          </Button>
        ) : (
          <Button onClick={() => toggleView()} backgroundColor="transparent">
            <Text fontSize={{ lg: "md", xl: "lg" }}>See All </Text>
          </Button>
        )}
      </CollapseControl>
      {seeAll ? (
        <SlideFade in={seeAll}>
          <GridSection>
            {sectionInfos.map((data: any) => (
              <Link to={`/${sectionType}/${data.id}`} key={data.id}>
                <InfoCard
                  title={data.title || data.name}
                  posterPath={data.poster_path || data.profile_path}
                  rating={data.vote_average}
                />
              </Link>
            ))}
          </GridSection>
        </SlideFade >
      ) : (
        <Fade in={!seeAll}>
          <CarouselSlider wrapperHeight={{lg:"50vh", xl: "40vh"}} buttonHeight={"15.4rem"}>
            {sectionInfos.map((data: any) => (
              <Link to={`/${sectionType}/${data.id}`} key={data.id}>
                <InfoCard
                  title={data.title || data.name}
                  posterPath={data.poster_path || data.profile_path}
                  rating={data.vote_average}
                />
              </Link>
            ))}
          </CarouselSlider>
        </Fade>
      )}
    </Flex>
  );
};

export default CollapseSection;
