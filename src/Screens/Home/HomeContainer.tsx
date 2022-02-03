import React, { useState, useEffect } from "react";
import HomePresenter from "./HomePresenter";
import { trendingApi } from "@api";

interface IHomeData {
  trendingMovies: Array<IMovieData>;
  trendingSeries: Array<ISeriesData>;
}

interface IRandoms {
  randomNumber: number;
  randomIndex: number;
}

const HomeContainer: React.FC = () => {
  const [home, setHome] = useState<IHomeData>({
    trendingMovies: [],
    trendingSeries: [],
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [randNum, setRandNum] = useState<IRandoms>({
    randomNumber: 1,
    randomIndex: 1,
  });

  const [mediaType, setMediaType] = useState<string>("movie");

  const { randomIndex, randomNumber } = randNum;
  const { trendingMovies, trendingSeries } = home;

  useEffect(() => {
    let mounted = true;
    const getHomeData = async () => {
      try {
        const {
          data: { results: trendingMovies },
        } = await trendingApi.trending("movie");

        const {
          data: { results: trendingSeries },
        } = await trendingApi.trending("tv");

        setHome({ ...home, trendingMovies, trendingSeries });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const genRandNum = (min: number, max: number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return setRandNum({
        randomNumber: Math.floor(Math.random() * (max - min)) + min,
        randomIndex: Math.floor(Math.random() * 20),
      });
    };

    const checkMediaType = () => {
      if (randomNumber % 2 === 0) {
        return setMediaType("series");
      }
    };

    if (mounted) {
      genRandNum(1, 9);
      checkMediaType();
      getHomeData();
    }

    return () => {
      mounted = false;
    };
  }, [randomNumber]);
  return (
    <HomePresenter
      trendingMovies={trendingMovies}
      trendingSeries={trendingSeries}
      randomIndex={randomIndex}
      mediaType={mediaType}
      error={error}
      loading={loading}
    />
  );
};

export default HomeContainer;
