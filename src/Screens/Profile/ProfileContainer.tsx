import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { personApi } from "@api";
import ProfilePresenter from "./ProfilePresenter";

interface IProfile {
  profileInfo: IPersonDetail ;
  movieCredits: IMovieCreditInfo ;
  seriesCredits: ISeriesCreditInfo ;
}

const ProfileContainer: React.FC = () => {
  const [detail, setDetail] = useState<IProfile>({
    profileInfo: {} as IPersonDetail,
    movieCredits: {} as IMovieCreditInfo,
    seriesCredits: {} as ISeriesCreditInfo,
  });

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  let { id } = useParams() as any;

  useEffect(() => {
    let mounted = true;
    const getPersonDetail = async () => {
      try {
        const { data: profileInfo } = await personApi.peopleDetail(id);
        const { data: movieCredits } = await personApi.movieCredits(id);
        const { data: seriesCredits } = await personApi.seiresCredits(id);
        setDetail({ ...detail, profileInfo, movieCredits, seriesCredits });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (mounted) {
      getPersonDetail();
    }

    return () => {
      mounted = false;
      setLoading(true);
    };
  }, []);

  const { profileInfo, movieCredits, seriesCredits } = detail;

  return (
    <ProfilePresenter
      profileInfo={profileInfo}
      movieCredits={movieCredits}
      seriesCredits={seriesCredits}
      loading={loading}
      error={error}
    />
  );
};

export default ProfileContainer;
