import React from "react";
import { Grid,Box,Text } from "@chakra-ui/react"

type IMovieData = []

interface IMovieProps {
  nowPlaying:null|IMovieData,
  upComing:null|IMovieData,
  popular:null|IMovieData,
  error:boolean,
  loading:boolean
}

const MoviePresenter:React.FC<IMovieProps> = ({nowPlaying,upComing,popular,error,loading}) => {
  return (
    <>
      { loading 
      ? <span role="img" aria-label="Loading"> ⏰ </span>
      : null }

      { error ? "An error has occured" : null }

      { nowPlaying !== null && nowPlaying.length > 0 
      ? <>
          <Text fontSize="2xl">NowPlaying</Text>
          <Grid>
            
          </Grid>
        </>
      :null
      }

      { upComing !== null && upComing.length > 0 
      ?  <Text fontSize="2xl">UpComing</Text>  
      :null
      }

      { popular !== null && popular.length > 0 
      ?  <Text fontSize="2xl">Popular</Text>  
      :null
      }
      
    </>

  )
  
  
};

export default MoviePresenter;
