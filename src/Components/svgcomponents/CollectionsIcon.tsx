import React from 'react'

const CollectionsIcon:React.FC<ISvgProps> = ({ width, height, color }) => {
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" 
      height="24px" 
      viewBox="0 0 24 24" 
      width="24px" 
      fill={color}>
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
    </svg>
    </>
  )
}

export default CollectionsIcon