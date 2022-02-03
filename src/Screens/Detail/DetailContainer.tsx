import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePathTypeCheck } from "@hooks/usePathTypeCheck";
import { movieApi, tvApi } from "@api";
import DetailPresenter from "./DetailPresenter";

interface IDetailInfos {
  detailInfo: DetailInfo;
  credits:  CreditInfo ;
  similars: Array<IMovieSimilar> | Array<ISeriesSimilar>;
}

const DetailContainer: React.FC = () => {
  const pathType = usePathTypeCheck();
  const [detail, setDetail] = useState<IDetailInfos>({
    detailInfo: {} as DetailInfo,
    credits: {} as CreditInfo,
    similars: [],
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  let { id } = useParams() as any;

  useEffect(() => {
    let mounted = true;
    const getDetail = () => {
      if (pathType === "movie") {
        const getMovieDetail = async () => {
          try {
            const { data: movieDetail } = await movieApi.movieDetail(id);
            const { data: casting } = await movieApi.credits(id);
            const {
              data: { results: similars },
            } = await movieApi.similar(id);
            setDetail({
              ...detail,
              detailInfo: movieDetail,
              credits: casting,
              similars,
            });
          } catch {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        getMovieDetail();
      }

      if (pathType === "series") {
        const getSeriesDetail = async () => {
          try {
            const { data: seriesDetail } = await tvApi.tvDetail(id);
            const { data: casting } = await tvApi.credits(id);
            const {
              data: { results: similars },
            } = await tvApi.similar(id);
            setDetail({
              ...detail,
              detailInfo: seriesDetail,
              credits: casting,
              similars,
            });
          } catch {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        getSeriesDetail();
      }
    };

    if (mounted) {
      getDetail();
    }

    return () => {
      mounted = false;
      setLoading(true);
    };
  }, [pathType, id]);
  const { detailInfo, credits, similars } = detail;

  return (
    <DetailPresenter
      detail={detailInfo}
      credits={credits}
      similar={similars}
      error={error}
      loading={loading}
    />
  );
};

export default DetailContainer;
