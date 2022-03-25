import React from "react";
import { VStack, Text, Flex } from "@chakra-ui/react";
import Section from "@components/Display/Section";

interface IBookMarkProps {
  movieBookMark: Array<IMovieDetail>;
  seriesBookMark:Array<ISeriesDetail>;
}

const BookMarkPresenter: React.FC<IBookMarkProps> = ({
  movieBookMark,
  seriesBookMark,
}) => {
  return (
    <>
      <VStack position="relative" width="70vw" mt={6} alignItems="start">
        {movieBookMark.length === 0 && seriesBookMark.length === 0 && (
          <Flex position="absolute" top="32" boxSize="max-content">
            <Text as="em" fontSize="3xl">
              Bookmark whatever you want
            </Text>
          </Flex>
        )}

        {movieBookMark.length !== 0 && (
          <Section
            title={"BookMarked Movies"}
            sectionInfoType={"movie"}
            sectionInfos={movieBookMark}
          />
        )}

        {seriesBookMark.length !== 0 && (
          <Section
            title={"BookMarked Series"}
            sectionInfoType={"series"}
            sectionInfos={seriesBookMark}
          />
        )}
      </VStack>
    </>
  );
};

export default BookMarkPresenter;
