import React from "react";
import { Helmet } from "react-helmet";
import InfoCard from "@components/Display/InfoCard";
import { Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { AutoGridLayoutSm } from "@components/Display/BasicLayouts";
import LoadingSpinner from "@components/LoadingSpinner";
import ErrorPopUp from "@components/ErrorPopUp";

interface IPersonProps {
  popular: Array<IPersonData>;
  error: boolean;
  loading: boolean;
}

const PersonPresenter: React.FC<IPersonProps> = ({
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
            <title>Kino Guide | Person</title>
          </Helmet>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Kino Guide | Person</title>
          </Helmet>
          <Flex
            direction={"column"}
            align={"center"}
            justify={"start"}
            width={"92vw"}
            mx={3}
            my={2}
            px={3}
          >
            <Text
              fontSize={"2xl"}
              mt={1}
              mb={3}
              fontWeight={"semibold"}
              alignSelf={"start"}
            >
              Popular people
            </Text>
            {popular !== null && popular.length > 0 && (
              <AutoGridLayoutSm>
                {popular.map((data: IPersonData) => (
                  <Link to={`/profile/${data.id}`}>
                    <InfoCard
                      key={data.id}
                      title={data.name}
                      posterPath={data.profile_path}
                    />
                  </Link>
                ))}
              </AutoGridLayoutSm>
            )}
          </Flex>
        </>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default PersonPresenter;
