import React from "react";
import { Helmet } from "react-helmet";
import CollapseSection from "@components/Layout/CollapseSection";
import ErrorPopUp from "@components/ErrorPopUp";
import { PresenterLayout } from "@components/Layout/BasicLayouts";
import LoadingSpinner from "@components/LoadingSpinner";
import ScrollToTop from "@components/ScrollToTop";

interface IMovieProps {
  nowPlaying: null | Array<any>;
  upComing: null | Array<any>;
  popular: null | Array<any>;
  error: boolean;
  loading: boolean;
}

const MoviePresenter: React.FC<IMovieProps> = ({
  nowPlaying,
  upComing,
  popular,
  error,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Kino Guide | Movie</title>
          </Helmet>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Kino Guide | Movie</title>
          </Helmet>
          <PresenterLayout>
            {nowPlaying !== null && nowPlaying.length > 0 && (
              <>
                <CollapseSection title="NowPlaying" sectionInfos={nowPlaying} />
              </>
            )}

            {popular !== null && popular.length > 0 && (
              <CollapseSection title="Popular Movies" sectionInfos={popular} />
            )}

            {upComing !== null && upComing.length > 0 && (
              <CollapseSection
                title="UpComing Movies"
                sectionInfos={upComing}
              />
            )}
          </PresenterLayout>
          {/* To the page top */}
          <ScrollToTop />
        </>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default MoviePresenter;
