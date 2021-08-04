import React, { useState, useEffect } from 'react'
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import DiscoverMovies from './DiscoverMovies'
import DiscoverSeries from './DiscoverSeries'

const DiscoverContainer:React.FC = () => {
  const [isMovie, setIsMovie] = useState<boolean>(true)
  let pathType = usePathTypeCheck()  

  useEffect(() => {
    let mounted = true
    const discoverType = () => {
      if(pathType==="series") {
        setIsMovie(false)
      }
    }
    if(mounted) {
      discoverType()
    }
    return () => {
      mounted = false
    }
  }, [pathType])
  
  
  return (
    <>
      { isMovie 
        ? <DiscoverMovies/>
        : <DiscoverSeries/>
      }
    </>
  )
}

export default DiscoverContainer