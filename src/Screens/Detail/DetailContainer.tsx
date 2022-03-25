import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import { movieApi, tvApi } from "@api";
import DetailPresenter from "./DetailPresenter/PresenterLayout";

interface IDetailInfos {
  detailInfo: DetailInfo;
  credits: CreditInfo;
  similar: Array<IMovieSimilar> | Array<ISeriesSimilar>;
}

const DetailContainer: React.FC = () => {
  const pathType = usePathTypeCheck() as string
  const [detail, setDetail] = useState<IDetailInfos>({
    detailInfo: {} as DetailInfo,
    credits: {} as CreditInfo,
    similar: [] as Array<IMovieSimilar> | Array<ISeriesSimilar>,
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams() as any;

  useEffect(() => {
    let mounted = true;
    const getDetail = () => {
      async function getMovieDetail(id: number) {
        try {
          const { data: movieDetail } = await movieApi.movieDetail(id);
          const { data: casting } = await movieApi.credits(id);
          const {
            data: { results: similarMovies },
          } = await movieApi.similar(id);
          setDetail({
            ...detail,
            detailInfo: movieDetail,
            credits: casting,
            similar: similarMovies,
          });
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    
      async function getSeriesDetail(id: number) {
        try {
          const { data: seriesDetail } = await tvApi.tvDetail(id);
          const { data: casting } = await tvApi.credits(id);
          const {
            data: { results: similarSeries },
          } = await tvApi.similar(id);
          setDetail({
            ...detail,
            detailInfo: seriesDetail,
            credits: casting,
            similar: similarSeries,
          });
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      }

      if (pathType === "movie") {
        return getMovieDetail(id);
      }

      if (pathType === "series") {
        return getSeriesDetail(id);
      }
    };
    if (mounted) {
      getDetail();
    }

    return () => {
      mounted = false;
    };
  }, [id, pathType]);
  const { detailInfo, credits, similar } = detail;

  return (
    <DetailPresenter
      detail={detailInfo}
      credits={credits}
      similar={similar}
      error={error}
      loading={loading}
    />
  );
};

export default DetailContainer;
