import React from 'react'
import BrokenPoster from './svgcomponents/BrokenPoster'
import BrokenPortrait from './svgcomponents/BrokenPortrait'
import { Image, Box, Flex } from "@chakra-ui/react"

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
        
        { imageType === "poster" && imageSource === undefined && 
          <Flex justify="center" align="center" width={width} height={height} borderColor="gray.600" border="1px" borderRadius="md">
            <BrokenPoster 
              width={"4rem"}
              height={"4rem"}/>
          </Flex>
        }

        { imageType === "portrait" && imageSource === null && 
          <Flex justify="center" align="center" width={width} height={height} borderColor="gray.600" border="1px" borderRadius="md">
            <BrokenPortrait
              width={"4rem"}
              height={"4rem"}/>
          </Flex> 
        }
      </Box> 
    </>
  )
}


export default InfoImage