import React, { useState, useEffect } from 'react'
import { discoverApi, genreApi } from '@api'
import DiscoverPresenter from './DiscoverPresenter'
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'

interface IDiscoverInfo {
  discoverList:null,
  discoverGenres:null
}

const DiscoverContainer:React.FC = () => {
  const [discoverInfo,setDiscoverInfo] = useState<IDiscoverInfo>({
    discoverList:null,
    discoverGenres:null
  })
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)
  let pathType = usePathTypeCheck()  

  
  useEffect(() => {
    let mounted = true
    const getDiscoverInfo = () => {
      if(pathType === "movie") {
        const getDiscoverMovieInfo = async() => {
          try {
            const { data:{ results } } = await discoverApi.discoverMovie()
            const { data:{ genres } } = await genreApi.movieGenres()
            setDiscoverInfo({ ...discoverInfo,
              discoverList:results,
              discoverGenres:genres })
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
            const { data:{ results} }  = await discoverApi.discoverSeries()
            const { data:{ genres } } = await genreApi.seriesGenres()
            setDiscoverInfo({ ...discoverInfo,
                              discoverList:results,
                              discoverGenres:genres })
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
  }, [pathType,discoverInfo])
  
  const { discoverList, discoverGenres } = discoverInfo
  return (
    <DiscoverPresenter
      genres={discoverGenres}
      infos={discoverList}
      error={error}
      loading={loading}/>
  )
}

export default DiscoverContainer