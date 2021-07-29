import React, { useState ,useEffect } from 'react'
import { useParams } from "react-router-dom";
import { tvApi } from "@api";
import DetailPresenter from "../DetailPresenter"



const SeriesDetail:React.FC = () => {
  const [detail,setDetail] = useState<IDetailInfos>({
    detailInfo:null,
    credits:null,
    similars:null,
  })
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)
  let { id } = useParams() as any
  
  useEffect(() => {
    const getSeriesDetail = async () => {
      try {
        const { data:seriesDetail } = await tvApi.tvDetail(id)
        const { data:casting } = await tvApi.credits(id)
        const { data:similars } = await tvApi.similar(id)
        setDetail({...detail,
                  detailInfo:seriesDetail,
                  credits:casting,
                  similars
        })
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getSeriesDetail()  

    return () => {
      getSeriesDetail()
    }  
  }, [detail,id])

  const { detailInfo, credits, similars } = detail

  return (
    <>
      <DetailPresenter
        detail={detailInfo}
        cast={credits}
        similar={similars}
        error={error}
        loading={loading}
    />
    </>
  )
}


export default SeriesDetail