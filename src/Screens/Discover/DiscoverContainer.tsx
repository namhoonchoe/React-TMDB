import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { discoverApi, genreApi } from '@api'
import DiscoverPresenter from './DiscoverPresenter'
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import { selectDiscoverQuery, getInfos } from '@redux/discoverSlice'


interface IDiscoverInfo {
  discoverList:null,
  discoverGenres:null
}

const DiscoverContainer:React.FC = () => {
  let pathType = usePathTypeCheck() 
  const [discoverInfo, setDiscoverInfo] = useState<IDiscoverInfo>({
    discoverList:null,
    discoverGenres:null
  })
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)
  const dispatch = useDispatch()

  const { sort, genreInclude, genreExclude, page } = useSelector(selectDiscoverQuery)

  useEffect(() => {
    let mounted = true

    const getDiscoverInfo = () => {
      if(pathType === "movie") {
        const getDiscoverMovieInfo = async() => {
          try {
            const { data:{ results } } = await discoverApi.discoverMovie(sort, genreInclude, genreExclude, page)
            const { data:{ genres } } = await genreApi.movieGenres()
            dispatch(getInfos({ discoverList:results, discoverGenres:genres }))
          } catch {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        getDiscoverMovieInfo()
      }

      if(pathType === "series") {
        const getDiscoverSeiresInfo = async() => {
          try {
            const { data:{ results} }  = await discoverApi.discoverSeries(sort, genreInclude, genreExclude, page)
            const { data:{ genres } } = await genreApi.seriesGenres()
            dispatch(getInfos({ discoverList:results, discoverGenres:genres }))
          } catch {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        getDiscoverSeiresInfo()
        
      }
    }

    if(mounted) {
      getDiscoverInfo()
    }

    return () => {
      mounted = false
    }
  }, [pathType,sort, genreInclude, genreExclude, page,dispatch])

  return (
    <DiscoverPresenter error={error}  loading={loading}/>
  )
}

export default DiscoverContainer