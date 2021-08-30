import React from 'react'
import BrokenPoster from '../svgcomponents/BrokenPoster'
import BrokenPortrait from '../svgcomponents/BrokenPortrait'
import { Image, Flex } from "@chakra-ui/react"

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
      { typeof imageSource === "string" && 
        <Image
            width={width}
            height={height}
            borderRadius={borderRadius}
            src={`https://image.tmdb.org/t/p/w300${imageSource}`}
          />
        }
        
        { imageType === "poster" && imageSource === undefined && 
          <Flex justify="center" align="center" width={width} height={height} border="1px" borderColor="gray.300" borderRadius="md">
            <BrokenPoster 
              width={"3rem"}
              height={"3rem"}/>
          </Flex>
        }

        { imageType === "portrait" && imageSource === null && 
          <Flex justify="center" align="center" width={width} height={height} border="1px"  borderColor="gray.300" borderRadius="md">
            <BrokenPortrait
              width={"3rem"}
              height={"3rem"}/>
          </Flex> 
        }
    </>
  )
}


export default InfoImage