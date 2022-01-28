import React from "react";
import { Flex, chakra } from "@chakra-ui/react";
import HalfStar from "./svgcomponents/HalfStar";
import StarIcon from "./svgcomponents/StarIcon";
import EmpthyStar from "./svgcomponents/EmpthyStar";

interface IStarRatingProps {
  rating: number | undefined;
}

const StarRating: React.FC<IStarRatingProps> = ({ rating }) => {
  const CenterdBox = chakra(Flex, {
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
            <CenterdBox>
              <EmpthyStar />
              <EmpthyStar />
              <EmpthyStar />
              <EmpthyStar />
              <EmpthyStar />
            </CenterdBox>
          )}

          {rating >= 0.5 && rating < 1 && (
            <CenterdBox>
              <HalfStar />
              <EmpthyStar />
              <EmpthyStar />
              <EmpthyStar />
              <EmpthyStar />
            </CenterdBox>
          )}

          {rating >= 1 && rating < 2 && (
            <CenterdBox>
              <StarIcon />
              <EmpthyStar />
              <EmpthyStar />
              <EmpthyStar />
              <EmpthyStar />
            </CenterdBox>
          )}

          {rating >= 2 && rating < 3 && (
            <CenterdBox>
              <StarIcon />
              <HalfStar />
              <EmpthyStar />
              <EmpthyStar />
              <EmpthyStar />
            </CenterdBox>
          )}

          {rating >= 3 && rating < 4 && (
            <CenterdBox>
              <StarIcon />
              <HalfStar />
              <EmpthyStar />
              <EmpthyStar />
              <EmpthyStar />
            </CenterdBox>
          )}

          {rating >= 4 && rating < 5 && (
            <CenterdBox>
              <StarIcon />
              <StarIcon />
              <EmpthyStar />
              <EmpthyStar />
              <EmpthyStar />
            </CenterdBox>
          )}

          {rating >= 5 && rating < 6 && (
            <CenterdBox>
              <StarIcon />
              <StarIcon />
              <HalfStar />
              <EmpthyStar />
              <EmpthyStar />
            </CenterdBox>
          )}

          {rating >= 6 && rating < 7 && (
            <CenterdBox>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <EmpthyStar />
              <EmpthyStar />
            </CenterdBox>
          )}

          {rating >= 7 && rating < 8 && (
            <CenterdBox>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <HalfStar />
              <EmpthyStar />
            </CenterdBox>
          )}

          {rating >= 8 && rating < 9 && (
            <CenterdBox>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <EmpthyStar />
            </CenterdBox>
          )}

          {rating >= 9 && rating < 10 && (
            <CenterdBox>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <HalfStar />
            </CenterdBox>
          )}

          {rating >= 10 && (
            <CenterdBox>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </CenterdBox>
          )}
        </>
      )}
    </>
  );
};

export default StarRating;
