import React from 'react'

interface IPosterProps {
  posterPath:string
  genres:any
  rating:number
}

const Poster:React.FC<IPosterProps> = ({posterPath,rating,genres}) => {
  return (
    <>
      <p>{Math.round(rating)/2 }</p>
    </>
  )
}


export default Poster