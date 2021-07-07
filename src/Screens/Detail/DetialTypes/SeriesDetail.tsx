import React from 'react'
import DetailPresenter from "../DetailPresenter"

export default function SeriesDetail() {
  return (
    <>
      <p>Series Detail</p>
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
