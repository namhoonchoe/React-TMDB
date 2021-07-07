import React from 'react'
import DetailPresenter from "../DetailPresenter"


export default function MovieDetail() {
  return (
    <>  
      <p>Movie Detail</p>
      <DetailPresenter
      detail={null}
      cast={null}
      similar={null}
      error={false}
      loading={false}
    />
    </>
  )
}
