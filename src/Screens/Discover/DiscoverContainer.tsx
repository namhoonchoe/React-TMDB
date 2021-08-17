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
  genreExclude:undefined | string,
  page:number
}

type genreFilters = Array<IGenre>

const DiscoverContainer:React.FC = () => {
  let pathType = usePathTypeCheck() 

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
    genreExclude:undefined,
    page:1
  })

  const { sort, genreInclude, genreExclude, page } = discoverQuery

  const genreFunctions:IGenreFunctions = {
    addToFilter:(genre:any) => setGenreFilter([...genreFilters,genre]),
    removeFromFilter:(genre:any) => setGenreFilter(genreFilters.filter((genreFilter) => genreFilter.info.id !== genre.info.id )),
    discoverTrigger:(sort:string, include:any, exclude:any) =>  setDiscoverQuery({ sort:sort,  genreInclude:include,  genreExclude:exclude, page }),
    fetchMore:() =>  setDiscoverQuery({...discoverQuery, page:page+1 })
  }

  const resetFilters = () => {
    setDiscoverInfo({
      discoverList,
      discoverGenres:null
    })

    setDiscoverQuery({
      page:1,
      sort:undefined,
      genreInclude:undefined,
      genreExclude:undefined
    })

    setGenreFilter([])
  }

  useEffect(() => {
    let mounted = true

    const getDiscoverInfo = () => {
      if(pathType === "movie") {
        const getDiscoverMovieInfo = async() => {
          try {
            const { data:{ results } } = await discoverApi.discoverMovie(sort, genreInclude, genreExclude, page)
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
            const { data:{ results} }  = await discoverApi.discoverSeries(sort, genreInclude, genreExclude, page)
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
      resetFilters()
    }
  }, [genreExclude, genreInclude, sort, page, pathType])
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