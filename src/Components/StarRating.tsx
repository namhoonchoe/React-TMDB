import React from "react";
import { Flex, chakra } from "@chakra-ui/react";
import { HalfStar, StarIcon, EmptyStar } from "./SvgIcons";

interface IStarRatingProps {
  rating: number | undefined;
}

const StarRating: React.FC<IStarRatingProps> = ({ rating }) => {
  const CenteredBox = chakra(Flex, {
    baseStyle: {
      justifyContent: "start",
      alignItems: "center",
    },
  });

  return (
    <>
      {rating !== undefined && (
        <>
          {rating < 0.5 && (
            <CenteredBox>
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
            </CenteredBox>
          )}

          {rating >= 0.5 && rating < 1 && (
            <CenteredBox>
              <HalfStar />
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
            </CenteredBox>
          )}

          {rating >= 1 && rating < 2 && (
            <CenteredBox>
              <StarIcon />
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
            </CenteredBox>
          )}

          {rating >= 2 && rating < 3 && (
            <CenteredBox>
              <StarIcon />
              <HalfStar />
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
            </CenteredBox>
          )}

          {rating >= 3 && rating < 4 && (
            <CenteredBox>
              <StarIcon />
              <HalfStar />
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
            </CenteredBox>
          )}

          {rating >= 4 && rating < 5 && (
            <CenteredBox>
              <StarIcon />
              <StarIcon />
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
            </CenteredBox>
          )}

          {rating >= 5 && rating < 6 && (
            <CenteredBox>
              <StarIcon />
              <StarIcon />
              <HalfStar />
              <EmptyStar />
              <EmptyStar />
            </CenteredBox>
          )}

          {rating >= 6 && rating < 7 && (
            <CenteredBox>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <EmptyStar />
              <EmptyStar />
            </CenteredBox>
          )}

          {rating >= 7 && rating < 8 && (
            <CenteredBox>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <HalfStar />
              <EmptyStar />
            </CenteredBox>
          )}

          {rating >= 8 && rating < 9 && (
            <CenteredBox>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <EmptyStar />
            </CenteredBox>
          )}

          {rating >= 9 && rating < 10 && (
            <CenteredBox>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <HalfStar />
            </CenteredBox>
          )}

          {rating >= 10 && (
            <CenteredBox>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </CenteredBox>
          )}
        </>
      )}
    </>
  );
};

export default StarRating;
