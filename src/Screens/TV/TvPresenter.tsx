import React from "react";
import { Helmet } from "react-helmet";
import CollapseSection from "@components/Display/CollapseSection";
import { PresenterLayout } from "@components/Display/BasicLayouts";
import LoadingSpinner from "@components/LoadingSpinner";
import ScrollToTop from "@components/ScrollToTop";
import ErrorPopUp from "@components/ErrorPopUp";

interface ISeriesProps {
  topRated: null |  Array<ISeriesData>;
  airingToday: null | Array<ISeriesData>;
  popular: null | Array<ISeriesData>;
  error: boolean;
  loading: boolean;
}

const TvPresenter: React.FC<ISeriesProps> = ({
  topRated,
  airingToday,
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
            <title>Kino Guide | Series</title>
          </Helmet>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Kino Guide | Series</title>
          </Helmet>
          <PresenterLayout>
            {airingToday !== null && airingToday.length > 0 && (
              <CollapseSection
                title={"Airing Today"}
                sectionInfos={airingToday}
              />
            )}

            {popular !== null && popular.length > 0 && (
              <CollapseSection
                title={"Popular Series"}
                sectionInfos={popular}
              />
            )}

            {topRated !== null && topRated.length > 0 && (
              <CollapseSection
                title={"TopRated Series"}
                sectionInfos={topRated}
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

export default TvPresenter;
