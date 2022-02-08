import React, { useState, useEffect, useRef } from "react";
import { resetRedirection, selectSearch } from "@redux/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import { movieApi, tvApi } from "@api";
import SearchPresenter from "./SearchPresenter";

interface ISearchData {
  movieResults: Array<ISearchMovies>;
  seriesResults: Array<ISearchSeries>;
}

const SearchContainer: React.FC = () => {
  const searchQuery = useSelector(selectSearch).searchQuery;
  const [results, setResults] = useState<ISearchData>({
    movieResults: [],
    seriesResults: [],
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  let movieRef = useRef<Array<ISearchMovies>>([])
  let seriesRef = useRef<Array<ISearchSeries>>([])

  const getSearchResults = async () => {
    try {
      const {
        data: { results: movieResults },
      } = await movieApi.movieSearch(searchQuery);
      const {
        data: { results: seriesResults },
      } = await tvApi.tvSearch(searchQuery);
      setResults({ ...results, movieResults, seriesResults });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      dispatch(resetRedirection());
      getSearchResults();
    }

    return () => {
      mounted = false;
      movieRef.current = [...results.movieResults]
      seriesRef.current = [...results.seriesResults]
    };
  }, [searchQuery]);

  const { movieResults, seriesResults } = results

  return (
    <SearchPresenter
      movieResults={ movieResults === [] ? movieRef.current : movieResults }
      seriesResults={ seriesResults  === [] ? seriesRef.current : seriesResults }
      loading={loading}
      error={error}
    />
  );
};

export default SearchContainer;
