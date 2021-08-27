import React , { useState, useEffect, useRef } from 'react'
import { resetRedirection, selectSearch } from '@redux/searchSlice'
import { useSelector, useDispatch } from 'react-redux'
import { movieApi,tvApi } from '@api'
import SearchPresenter from './SearchPresenter'

interface ISearchData {
  movieResults:null|SearchData,
  seriesResults:null|SearchData
}

const SearchContainer:React.FC = () => {
  const searchQuery = useSelector(selectSearch).searchQuery
  const [results, setResults] = useState<ISearchData>({
    movieResults:null,
    seriesResults:null
  })
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)  
  const dispatch = useDispatch()

  let searchRef = useRef<string>("")

  useEffect(() => {
    let mounted = true;
    const getSearchResults = async() => {
      try {
        const {
          data: { results: movieResults },
        } = await movieApi.movieSearch(searchRef.current);
        const {
          data: { results: seriesResults },
        } = await tvApi.tvSearch(searchRef.current);
        setResults({ ...results, movieResults, seriesResults })
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    } 
    if(mounted) {
      searchRef.current = searchQuery 
      getSearchResults()
    }

    return () => {
      mounted = false
      dispatch(resetRedirection())
    }

  }, [searchQuery,results,dispatch])

  const { movieResults, seriesResults } = results

  return (
    <SearchPresenter
      movieResults={movieResults}
      seriesResults={seriesResults}
      loading={loading}
      error={error}
    />
  )
}


export default SearchContainer