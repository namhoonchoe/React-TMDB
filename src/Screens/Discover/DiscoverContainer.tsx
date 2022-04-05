import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { discoverApi, genreApi } from "@api";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import {
  selectDiscoverQuery,
  resetTrigger,
  getInfos,
} from "@redux/discoverSlice";
import DiscoverPresenter from "./DiscoverPresenter";

const DiscoverContainer: React.FC = () => {
  let pathType = usePathTypeCheck();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { sort, genreInclude, genreExclude, page } = useSelector(selectDiscoverQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const getDiscoverInfo = () => {
      if (pathType === "movie") {
        const getDiscoverMovieInfo = async () => {
          try {
            const {
              data: { results },
            } = await discoverApi.discoverMovie(
              sort,
              genreInclude,
              genreExclude,
              page
            );
            const {
              data: { genres },
            } = await genreApi.movieGenres();
            dispatch(
              getInfos({ discoverList: results, discoverGenres: genres })
            );
          } catch {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        getDiscoverMovieInfo();
      }

      if (pathType === "series") {
        const getDiscoverSeriesInfo = async () => {
          try {
            const {
              data: { results },
            } = await discoverApi.discoverSeries(
              sort,
              genreInclude,
              genreExclude,
              page
            );
            const {
              data: { genres },
            } = await genreApi.seriesGenres();
            dispatch(
              getInfos({ discoverList: results, discoverGenres: genres })
            );
          } catch {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        getDiscoverSeriesInfo();
      }
    };

    if (mounted) {
      getDiscoverInfo();
    }

    return () => {
      mounted = false;
      resetTrigger()
    };
  }, [pathType, genreExclude, genreInclude, sort, page]);

  return <DiscoverPresenter error={error} loading={loading} />;
};

export default DiscoverContainer;
