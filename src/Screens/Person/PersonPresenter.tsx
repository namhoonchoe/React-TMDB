import React from "react";
import { Helmet } from "react-helmet";
import InfoCard from "@components/Layout/InfoCard"
import { Link } from "react-router-dom";
import { Flex, Text, Grid  } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"


interface IPersonProps {
  popular:null|Array<any>,
  error:boolean,
  loading:boolean
}

const PersonPresenter:React.FC<IPersonProps> = ({ popular, error, loading }) => {
  return (
  <>
    { loading 
    ? <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Kino Guide | Person</title>
        </Helmet>
        <LoadingSpinner/> 
      </>
    :<>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Kino Guide | Person</title>
    </Helmet>
    <Flex direction="column" align="center" justify="start" width="92vw" mx={3} my={2} px={3}>
      <Text fontSize="2xl" mt={1} mb={3} fontWeight="semibold" alignSelf="start">Popular people</Text>
      { popular !== null && popular.length > 0 &&
        <Grid templateColumns="repeat(auto-fit,minmax(10.5rem, 1fr))" columnGap="6" width="100%">  
          {popular.map((data:any) => (
          <Link to={`/profile/${data.id}`}>
            <InfoCard
              key={data.id}
              title={data.title||data.name}
              posterPath={data.poster_path||data.profile_path}
              rating={data.vote_average}/>
            </Link>))}
        </Grid> }
      </Flex>  
    </>
    }

    { error ? <p>An error has occured</p>: null }
  </>
  )
};

export default PersonPresenter;
