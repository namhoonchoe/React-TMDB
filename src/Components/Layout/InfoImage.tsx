import React from 'react'
import BrokenPoster from '../svgcomponents/BrokenPoster'
import BrokenPortrait from '../svgcomponents/BrokenPortrait'
import { Image, Flex, useColorMode } from "@chakra-ui/react"

interface IImageProps {
  borderRadius:string,
  imageType?:string,
  height?:string,
  width?:string,
  imageSource:string|undefined|null
}

const InfoImage:React.FC<IImageProps> = ({ borderRadius, imageSource, imageType, height ,width }) => {
  const colorMode = useColorMode().colorMode

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
          <Flex justify="center" align="center" width={width} height={height} border="1px" borderColor="gray.300"  borderRadius={borderRadius}>
            <BrokenPoster 
              width={"3rem"}
              height={"3rem"}
              color={colorMode==="light" ? "#A0AEC0" : "#F7FAFC"}/>
          </Flex>
        }

        { imageType === "portrait" && imageSource === null && 
          <Flex justify="center" align="center" width={width} height={height} border="none"  >
            <BrokenPortrait
              width={"3rem"}
              height={"3rem"}
              color={colorMode==="light" ? "#A0AEC0" : "#F7FAFC"}/>
          </Flex> 
        }
    </>
  )
}


export default InfoImage