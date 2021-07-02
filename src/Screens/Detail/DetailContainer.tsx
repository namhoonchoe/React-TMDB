import React, { useState , useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { movieApi, tvApi , personApi } from "../../Api";
import DetailPresenter from "./DetailPresenter"


interface IDetailData {
  detailInfos:null|DetailData,
  cast:null|DetailData,
  similar:null|DetailData
}


const DetailContainer:React.FC = () => {
  const parsedId:number = parseInt(useParams())
  const path:string =  useLocation().pathname
  const [detail,setDetail] = useState<IDetailData>({
    detailInfos:null,
    cast:null,
    similar:null
  })

  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)

  
  return (
  <>
    <DetailPresenter
      detail={detailInfos}
      cast={cast}
      similar={similar}
      error={error}
      loading={loading}
    />
  </>
  )
}
export default DetailContainer



