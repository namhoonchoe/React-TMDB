import React , { useState, useEffect } from 'react'
import { selectSearch, getSearchTerm } from '@redux/searchSlice'
import { useSelector, useDispatch } from 'react-redux'
import { movieApi,tvApi } from '@api'
import SearchPresenter from './SearchPresenter'

interface ISearchData {
  movieResults:null|SearchData,
  seriesResults:null|SearchData
}

const SearchContainer:React.FC = () => {
  const searchQuery = useSelector(selectSearch)
  const dispatch = useDispatch()
  const [results, setResults] = useState<ISearchData>({
    movieResults:null,
    seriesResults:null
  })
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)


  useEffect(() => {
    let mounted = true;
    const getSearchResults = async() => {
      try {
        const {
          data: { results: movieResults },
        } = await movieApi.movieSearch(searchQuery);
        const {
          data: { results: seriesResults },
        } = await tvApi.tvSearch(searchQuery);
        setResults({ ...results, movieResults, seriesResults })
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    } 
    if(mounted) {
      getSearchResults()
    }

    return () => {
      mounted = false
      dispatch(getSearchTerm(""))
    }

  }, [searchQuery,results,dispatch])

  const { movieResults, seriesResults } = results

  return (
    <>
      <SearchPresenter
        movieResults={movieResults}
        seriesResults={seriesResults}
        loading={loading}
        error={error}
      />
    </>
  )
}


export default SearchContainer