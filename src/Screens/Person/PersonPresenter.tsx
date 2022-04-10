import React from "react";
import { Helmet } from "react-helmet";
import InfoCard from "@components/Display/InfoCard";
import { Link } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import { selectPage, nextPage, prevPage } from "@redux/peopleSlice";
import { AutoGridLayoutSm } from "@components/Display/BasicLayouts";
import LoadingSpinner from "@components/LoadingSpinner";
import ErrorPopUp from "@components/ErrorPopUp";
import { useSelector, useDispatch } from "react-redux";

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
  const { page } = useSelector(selectPage)
  const dispatch = useDispatch()
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
                  <Link to={`/profile/${data.id}`} key={data.id}>
                    <InfoCard
                      title={data.name}
                      posterPath={data.profile_path}
                    />
                  </Link>
                ))}
              </AutoGridLayoutSm>
            )}
            <Flex alignItems={"center"} justifyContent={"space-between"}  mt={2}>
              {page > 1 && <Button onClick={() => dispatch(prevPage())}>Prev Page</Button>}
              <Button onClick={() => dispatch(nextPage())} ml={1}>Next Page</Button>
            </Flex>
          </Flex>
        </>
      )}

      {error ? <ErrorPopUp /> : null}
    </>
  );
};

export default PersonPresenter;
