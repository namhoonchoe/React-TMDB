import React,{useState,useEffect} from "react";
import TvPresenter from "./TvPresenter";
import { tvApi } from "@api";

interface ITvData {
	topRated:null,
	popular:null,
	airingToday:null
}


const TvContainer:React.FC = () => {
  const [series,setSeries] = useState<ITvData>({ 
    topRated:null,
    popular:null,
    airingToday:null
  })
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)

  useEffect(() =>{
    let mounted = true;
    const getSeriesData = async() =>{
      try { 
      const { 
        data:{ results:topRated } 
        } = await tvApi.topRated();
  
      const {
        data: { results: airingToday },
        } = await tvApi.airingToday();

      const {
        data: { results: popular },
        } = await tvApi.popular();
        
        setSeries({...series,topRated,airingToday,popular})
      } catch {   
        setError(true)
      } finally {
        setLoading(false)
      }
    } 
    if (mounted){
      getSeriesData()
    }
    return () => {
      mounted = false
    }},[])
    const {topRated,airingToday,popular} = series

  return (
  <>
    <TvPresenter
      topRated={topRated}
      airingToday={airingToday}
      popular={popular}
      error={error}
      loading={loading}
    />
  </>
  )
}

export default TvContainer