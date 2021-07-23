import React from 'react'
import BrokenPoster from './svgcomponents/BrokenPoster'
import BrokenPortrait from './svgcomponents/BrokenPortrait'
import { Image, Box } from "@chakra-ui/react"

interface IImageProps {
  borderRadius:string,
  imageType?:string,
  imageSource:string|undefined|null
}

const InfoImage:React.FC<IImageProps> = ({ borderRadius, imageSource, imageType }) => {
  
  return (
    <>
      <Box boxSize="inherit">
        {imageSource !== undefined && 
          <Image
            borderRadius={borderRadius}
            src={`https://image.tmdb.org/t/p/w300${imageSource}`}
          />
        }
        {imageType === "poster" && imageSource === undefined && 
          <BrokenPoster/>
        }
        {imageType === "portrait" && imageSource === null && 
          <BrokenPortrait/>
        }

      </Box> 
    </>
  )
}


export default InfoImage