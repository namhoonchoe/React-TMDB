import React from 'react'

const SeriesIcon:React.FC<ISvgProps> = ({ width, height }) => {
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 0 24 24" 
        width="24px" 
        fill="#CBD5E0">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z"/>
    </svg>
    </>
  )
}

export default SeriesIcon