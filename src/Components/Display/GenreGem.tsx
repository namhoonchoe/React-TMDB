import React, { useState, useEffect } from "react";
import ErrorPopUp from "@components/ErrorPopUp";
import { genreApi } from "@api";
import { Text, Box, Fade, chakra } from "@chakra-ui/react";
 
interface IGenre {
  id: number;
  name: string;
}

interface IGenreProps {
  genreId: number;
  genreType: string;
  fontSize?: string;
  borderColor?:string
}
const GenreGem: React.FC<IGenreProps> = ({
  genreId,
  genreType,
  fontSize = "sm",
  borderColor="white"
}) => {
  const [genreList, setGenreList] = useState<Array<IGenre>>([]);
  const [genre, setGenre] = useState<IGenre|null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);


  const GenreBox = chakra(Box, {
    baseStyle: {
      mr: "2",
      mt: "1.5",
      p: "1.5",
      boxSize: "max-content",
      border: "1px",
      borderColor: borderColor,
      rounded:"xl",
    },
  });

  useEffect(() => {
    let mounted = true;

    const getGenreList = () => {
      if (genreType === "movie") {
        const getMovieGenre = async () => {
          try {
            const {
              data: { genres },
            } = await genreApi.movieGenres();
            setGenreList(genres);
          } catch {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        getMovieGenre();
      }

      if (genreType === "series") {
        const getSeriesGenre = async () => {
          try {
            const {
              data: { genres },
            } = await genreApi.seriesGenres();
            setGenreList(genres);
          } catch {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        getSeriesGenre();
      }
    };

    const extractGenre = (genreId: number) => {
      if (genreId !== null && genreId !== undefined) {
        const [filtered] = genreList.filter((genre) => genre.id === genreId);
        return setGenre(filtered);
      } else {
        return setGenre(null);
      }
    };

    if (mounted) {
      getGenreList();
      extractGenre(genreId);
    }

    return () => {
      mounted = false;
    };
  }, [genreId, genreList, genreType]);

  return (
    <>
      {loading === false && (
        <Fade in={!loading}>
          {genre !== null && genre !== undefined && (
            <GenreBox>
              <Text fontSize={fontSize} fontWeight="hairline">
                {genre.name}
              </Text>
            </GenreBox>
          )}
        </Fade>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default GenreGem;
