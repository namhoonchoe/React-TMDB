import React from "react";
import { Helmet } from "react-helmet";
import CollapseSection from "@components/Display/CollapseSection";
import ErrorPopUp from "@components/ErrorPopUp";
import { PresenterLayout } from "@components/Display/BasicLayouts";
import LoadingSpinner from "@components/LoadingSpinner";
import ScrollToTop from "@components/ScrollToTop";

interface IMovieProps {
  nowPlaying: Array<IMovieData>;
  upComing: Array<IMovieData>;
  popular: Array<IMovieData>;
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
            {nowPlaying.length > 0 && (
              <CollapseSection title="NowPlaying" sectionInfos={nowPlaying} />
            )}

            {popular.length > 0 && (
              <CollapseSection title="Popular Movies" sectionInfos={popular} />
            )}

            {upComing.length > 0 && (
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
