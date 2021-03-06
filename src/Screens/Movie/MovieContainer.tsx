import React, { useState, useEffect } from "react";
import MoviePresenter from "./MoviePresenter";
import { movieApi } from "@api";

interface IMovieDataProps {
  nowPlaying: Array<IMovieData>;
  upComing: Array<IMovieData>;
  popular: Array<IMovieData>;
}

const MovieContainer: React.FC = () => {
  const [movie, setMovie] = useState<IMovieDataProps>({
    nowPlaying: [],
    upComing: [],
    popular: [],
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const getMovieData = async () => {
      try {
        const {
          data: { results: nowPlaying },
        } = await movieApi.nowPlaying();

        const {
          data: { results: upComing },
        } = await movieApi.upComing();

        const {
          data: { results: popular },
        } = await movieApi.popular();

        setMovie({ ...movie, nowPlaying, upComing, popular });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (mounted) {
      getMovieData();
    }
    return () => {
      mounted = false;
    };
  }, []);
  const { nowPlaying, upComing, popular } = movie;
  return (
    <MoviePresenter
      nowPlaying={nowPlaying}
      upComing={upComing}
      popular={popular}
      error={error}
      loading={loading}
    />
  );
};

export default MovieContainer;
