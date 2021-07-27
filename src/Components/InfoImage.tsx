import React from 'react'
import BrokenPoster from './svgcomponents/BrokenPoster'
import BrokenPortrait from './svgcomponents/BrokenPortrait'
import { Image, Box } from "@chakra-ui/react"

interface IImageProps {
  borderRadius:string,
  imageType?:string,
  height?:string,
  width?:string,
  imageSource:string|undefined|null
}


const InfoImage:React.FC<IImageProps> = ({ borderRadius, imageSource, imageType, height ,width }) => {
  return (
    <>
      <Box>
        { typeof imageSource === "string"
        ? <Image
            width={width}
            height={height}
            borderRadius={borderRadius}
            src={`https://image.tmdb.org/t/p/w300${imageSource}`}
          />
        : null
        }
        
        {imageType === "poster" && imageSource === undefined && 
          <Box width={width} height={height}>
            <BrokenPoster 
              width={width}
              height={height}/>
          </Box> 
        }

        {imageType === "portrait" && imageSource === null && 
          <Box>
            <BrokenPortrait
              width={width}
              height={height}/>
          </Box> 
        }
      </Box> 
    </>
  )
}


export default InfoImage