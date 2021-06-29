import React, { useState, useEffect } from 'react'
import { useLocation,useParams } from "react-router-dom";
import { movieApi, tvApi , personApi } from "../../Api";

interface IDetailData {
  detailInfos:null,
  cast:null,
  similar:null
}

const DetailContainer:React.FC = () => {
  const [detail,setDetail] = useState<IDetailData>({
    detailInfos:null,
    cast:null,
    similar:null
  })
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)

  const path:any =  useLocation().pathname
  const id:number = useParams()

  useEffect(() => {
    const getDetail = async() => {
      try { 
        switch(path) {
          case path.includes('person'):
            const {
              data: { results: personDetail },
              } = await personApi.peopleDetail(id);
            const {
              data: { results: credits },
              } = await personApi.credits(id);
            return setDetail({ ...detail,
                              detailInfos:personDetail,
                              cast:credits,
                              similar:null
                            })
          case path.includes('tv'):
            const {
              data: { results: seriesDetail },
              } = await movieApi.movieDetail(id);
            const {
              data: { results: seriesCast },
              } = await movieApi.credits(id);
            const {
              data: { results: similarSerires },
              } = await movieApi.similar(id);
            return setDetail({ ...detail,
                              detailInfos:seriesDetail,
                              cast:seriesCast,
                              similar:similarSerires
                          })
          default:
            const {
              data: { results: movieDetail },
              } = await tvApi.tvDetail(id);
            const {
              data: { results: movieCast },
              } = await tvApi.credits(id);
            const {
              data: { results: similarMovie },
              } = await tvApi.similar(id);
            return setDetail({ ...detail,
                              detailInfos:movieDetail,
                              cast:movieCast,
                              similar:similarMovie
                          })}
        } catch {   
          setError(true)
        } finally {
          setLoading(false)
        }
      } 
      getDetail()
    }, [detail])
  const { detailInfos, cast, similar} = detail
  
  return (
  <>
    
  </>
  )
}
export default DetailContainer