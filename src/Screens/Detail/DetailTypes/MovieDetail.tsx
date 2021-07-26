import React, { useState ,useEffect } from 'react'
import { useParams } from "react-router-dom";
import { movieApi } from "@api"
import DetailPresenter from '../DetailPresenter';

const MovieDetail:React.FC = () => {
  const [detail,setDetail] = useState<IDetailInfos>({
    detailInfo:null,
    credits:null,
    similars:null,
  })
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)
  let { id } = useParams() as any

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const { data:movieDetail } = await movieApi.movieDetail(id)
        const { data:casting } = await movieApi.credits(id)
        const { data:similars } = await movieApi.similar(id)
        setDetail({...detail,
                  detailInfo:movieDetail,
                  credits:casting,
                  similars
        })
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getMovieDetail()  
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

export default MovieDetail