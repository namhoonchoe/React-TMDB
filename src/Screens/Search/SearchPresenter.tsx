import React from "react";

interface ISearchpProps {
  movieResults:null|SearchData,
  seriesResults:null|SearchData,
  loading:boolean,
  error:boolean
}


const SearchPresenter:React.FC<ISearchpProps> = ({ movieResults,seriesResults,loading,error }) => {
  return <div>This is search</div>;
};

export default SearchPresenter;
