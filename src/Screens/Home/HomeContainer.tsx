import React,{useState,useEffect} from 'react'
import HomePresenter from './HomePresenter'
import { trendingApi } from '@api'

interface IHomeData {
  trendingMovies:null,
  trendingSeries:null,
  trendingPeople:null
}


const HomeContainer:React.FC = () => {
  const [home,setHome] = useState<IHomeData>({ 
    trendingMovies:null,
    trendingSeries:null,
    trendingPeople:null})
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
        data: { results: trendingSeries },
        } = await trendingApi.trending("tv");

      const {
        data: { results:trendingPeople },
        } = await trendingApi.trending("person");

        setHome({...home,trendingMovies,trendingSeries,trendingPeople})
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
  },[home])


    const { trendingMovies, trendingSeries, trendingPeople } = home
  return (
  <>
    <HomePresenter
      trendingMovies={trendingMovies}
      trendingSeries={trendingSeries}
      trendingPeople={trendingPeople}
      error={error}
      loading={loading}
    />
  </>
  )
}

export default HomeContainer