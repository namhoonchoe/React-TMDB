import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectMovieBookMarks,
  selectSeriesBookMarks,
} from "@redux/bookMarkSlice";
import BookMarkPresenter from "./BookMarkPresenter";

interface IBookMarkInfo {
  movieInfo: any;
  seriesInfo: any;
}

const BookMarkContainer: React.FC = () => {
  const movieBookMarks = useSelector(selectMovieBookMarks);
  const seriesBookMarks = useSelector(selectSeriesBookMarks);

  const [bookMarkInfo, setBookMarkInfo] = useState<IBookMarkInfo>({
    movieInfo: [],
    seriesInfo: [],
  });

  useEffect(() => {
    let mounted = true;
    const getBookMarkData = () => {
      setBookMarkInfo({
        movieInfo: movieBookMarks,
        seriesInfo: seriesBookMarks,
      });
    };
    if (mounted) {
      getBookMarkData();
    }
    return () => {
      mounted = false;
    };
  }, [movieBookMarks, seriesBookMarks]);

  const { movieInfo, seriesInfo } = bookMarkInfo;
  return (
    <BookMarkPresenter movieBookMark={movieInfo} seriesBookMark={seriesInfo} />
  );
};

export default BookMarkContainer;
