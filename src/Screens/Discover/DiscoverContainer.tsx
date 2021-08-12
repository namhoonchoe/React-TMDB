import React, { useState, useEffect } from 'react'
import { discoverApi, genreApi } from '@api'
import DiscoverPresenter from './DiscoverPresenter'
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'

interface IDiscoverInfo {
  discoverList:null,
  discoverGenres:null
}

interface IGenre {
  info:any,
  type:string
}

interface IDiscoverQuery {
  sort:undefined | string,
  genreInclude:undefined | string,
  genreExclude:undefined | string
}

type genreFilters = Array<IGenre>

const DiscoverContainer:React.FC = () => {
  const [discoverInfo,setDiscoverInfo] = useState<IDiscoverInfo>({
    discoverList:null,
    discoverGenres:null
  })
  const [genreFilters, setGenreFilter] = useState<genreFilters>([])
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)
  const [discoverQuery, setDiscoverQuery] = useState<IDiscoverQuery>({
    sort:undefined,
    genreInclude:undefined,
    genreExclude:undefined
  })

  const { sort, genreInclude, genreExclude } = discoverQuery
  const [page, setPage] = useState<number>(1)

  let pathType = usePathTypeCheck()  

  const genreFunctions:IGenreFunctions = {
    addToFilter:(genre:any) => setGenreFilter([...genreFilters,genre]),
    removeFromFilter:(genre:any) => setGenreFilter(genreFilters.filter((genreFilter) => genreFilter.info.id !== genre.info.id )),
    discoverTrigger:(sort:string, include:any, exclude:any) =>  setDiscoverQuery({ sort:sort,  genreInclude:include,  genreExclude:exclude }),
    fetchMore:() => setPage(page+1)
  }

  const resetFilter = () => {
    setGenreFilter([])
  }

  useEffect(() => {
    let mounted = true

    const getDiscoverInfo = () => {
      if(pathType === "movie") {
        const getDiscoverMovieInfo = async() => {
          try {
            const { data:{ results } } = await discoverApi.discoverMovie(sort,genreInclude,genreExclude,page)
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
        resetFilter()
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
        resetFilter()
        getDiscoverSeiresInfo()
      }
    }

    if(mounted) {
      getDiscoverInfo()
    }

    return () => {
      mounted = false
    }
  }, [pathType,page,genreInclude])
  
  const { discoverList, discoverGenres } = discoverInfo
  return (
    <DiscoverPresenter
      genres={discoverGenres}
      infos={discoverList}
      filterList={genreFilters}
      genreFunctions={genreFunctions}
      error={error}
      loading={loading}/>
  )
}

export default DiscoverContainer