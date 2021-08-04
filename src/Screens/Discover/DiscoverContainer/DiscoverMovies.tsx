import React, { useState, useEffect } from 'react'
import { discoverApi, genreApi } from '@api'
import DiscoverPresenter from '../DiscoverPresenter'

interface IDiscoverInfo {
  discoverList:null,
  discoverGenres:any
}

const DiscoverMovies:React.FC = () => {
  const [discoverInfo,setDiscoverInfo] = useState<IDiscoverInfo>({
    discoverList:null,
    discoverGenres:null
  })
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true
    const getDiscoverInfo = async() => {
      try {
        const { data:results } = await discoverApi.discoverMovie()
        const { data:genres } = await genreApi.movieGenres()
        setDiscoverInfo({ ...discoverInfo,
          discoverList:results,
          discoverGenres:genres })
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    
    if(mounted){
      getDiscoverInfo()
    }

    return () => {
      mounted = false
    }
  }, [discoverInfo])


  return (
    <>
      <DiscoverPresenter
        disiscoverInfo={discoverInfo}
        error={error}
        loading={loading}
    />
  </>
  )
}

export default DiscoverMovies