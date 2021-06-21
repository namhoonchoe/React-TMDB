import React from "react";
import Section from "../../Components/Section"
import LoadingSpinner from "../../Components/LoadingSpinner"

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
      ?<LoadingSpinner/> 
      : null }

      { error ? <p>"An error has occured"</p>: null }

      { nowPlaying !== null && nowPlaying.length > 0 
      ? <Section 
        title={"NowPlaying"}
        sectionInfos={nowPlaying}/>
      :null
      }

      { upComing !== null && upComing.length > 0 
      ? <Section 
      title={"UpComing"}
      sectionInfos={upComing}
      />
      :null
      }

      { popular !== null && popular.length > 0 
      ? <Section 
        title={"Popular"}
        sectionInfos={popular}
        />
      :null
      }
      
    </>

  )
  
  
};

export default MoviePresenter;
