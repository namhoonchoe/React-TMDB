import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { personApi } from "@api";
import ProfilePresenter from "./ProfilePresenter";

interface IProfile {
  profileInfo: any;
  movieCredits: any;
  seiresCredits: any;
}

const ProfileContainer: React.FC = () => {
  const [detail, setDetail] = useState<IProfile>({
    profileInfo: null,
    movieCredits: null,
    seiresCredits: null,
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
        const { data: seiresCredits } = await personApi.seiresCredits(id);
        setDetail({ ...detail, profileInfo, movieCredits, seiresCredits });
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

  const { profileInfo, movieCredits, seiresCredits } = detail;

  return (
    <ProfilePresenter
      profileInfo={profileInfo}
      movieCredits={movieCredits}
      seiresCredits={seiresCredits}
      loading={loading}
      error={error}
    />
  );
};

export default ProfileContainer;
