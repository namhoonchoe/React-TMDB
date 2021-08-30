import React,{ useState, useEffect } from 'react'
import HomePresenter from './HomePresenter'
import { trendingApi } from '@api'

interface IHomeData {
  trendingMovies:null,
  trendingSeries:null,
}

const HomeContainer:React.FC = () => {
  const [home,setHome] = useState<IHomeData>({ 
    trendingMovies:null,
    trendingSeries:null})
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true;
    const getHomeData = async() => {
      try { 
      const { 
        data:{ results:trendingMovies } 
        } = await trendingApi.trending("movie");
  
      const {
        data: { results:trendingSeries },
        } = await trendingApi.trending("tv");

        setHome({...home,trendingMovies,trendingSeries})
      } catch {   
        setError(true)
      } finally {
        setLoading(false)
      }
    } 
    if(mounted) {
      getHomeData()
    }
    return() => {
      mounted = false
    }
  },[])
    const { trendingMovies, trendingSeries } = home
    return (
    <HomePresenter
      trendingMovies={trendingMovies}
      trendingSeries={trendingSeries}
      error={error}
      loading={loading}
    />
  )
}

export default HomeContainer