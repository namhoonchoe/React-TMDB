import React from "react";

interface IMovieProps {
  nowPlaying:null,
  upComing:null,
  popular:null,
  error:string|null,
  loading:boolean
}

const MoviePresenter:React.FC<IMovieProps> = ({nowPlaying,upComing,popular,error,loading}) => {
  return <div>this is movie page</div>;
};

export default MoviePresenter;
