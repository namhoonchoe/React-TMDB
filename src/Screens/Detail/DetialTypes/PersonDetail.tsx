import React, { useState ,useEffect } from 'react'
import { useParams } from "react-router-dom";
import { personApi } from "Api";
import DetailPresenter from "../DetailPresenter"


const PersonDetail:React.FC = () => {
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
        const { data:personDetail } = await personApi.peopleDetail(id)
        const { data:casting } = await personApi.credits(id)
        setDetail({...detail,
                  detailInfo:personDetail,
                  credits:casting,
        })
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getSeriesDetail()  
  }, [detail,id])
  const { detailInfo, credits, similars } = detail

  return (
    <>
      <p>PersonDetail</p>
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

export default PersonDetail