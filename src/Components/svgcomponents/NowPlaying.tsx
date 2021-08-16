import React from 'react'

const NowPlaying:React.FC<ISvgProps> = ({ width, height }) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#CBD5E0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm6 10h-4V5h4v14zm4-2h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>
    </>
  )
}

export default NowPlaying