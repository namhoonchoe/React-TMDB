import React from "react";
import { Helmet } from "react-helmet";
import { Flex } from "@chakra-ui/react";
import LoadingSpinner from "@components/LoadingSpinner";
import ScrollToTop from "@components/ScrollToTop";
import ErrorPopUp from "@components/ErrorPopUp";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

interface IProfileProps {
  profileInfo: any;
  movieCredits: null | Array<any>;
  seiresCredits: null | Array<any>;
  loading: boolean;
  error: boolean;
}

const ProfilePresenter: React.FC<IProfileProps> = ({
  loading,
  error,
  profileInfo,
  movieCredits,
  seiresCredits,
}) => {
  return (
    <>
      {loading ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Kino Guide | Profile</title>
          </Helmet>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <Flex direction="column" align="center" justify="center" width="100%">
            <ProfileHeader
              profileSource={profileInfo.profile_path}
              name={profileInfo.name}
              bioGraphy={profileInfo.biography}
            />
            <ProfileBody
              profileInfo={profileInfo}
              movieCredits={movieCredits}
              seriesCredits={seiresCredits}
            />
          </Flex>
          <ScrollToTop />
        </>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default ProfilePresenter;
