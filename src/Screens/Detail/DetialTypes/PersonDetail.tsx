import React from 'react'
import DetailPresenter from "../DetailPresenter"

export default function PersonDetail() {
  return (
    <>
      <p>PersonDetail</p>
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
