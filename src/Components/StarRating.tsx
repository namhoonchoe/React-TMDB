import React from 'react'
import { Flex } from '@chakra-ui/layout'
import HalfStar from './svgcomponents/HalfStar'
import StarIcon from './svgcomponents/StarIcon'

interface IStarRatingProps {
  rating:number
} 

const StarRating:React.FC<IStarRatingProps> = ({rating}) => {
  return (
    <>
      { rating < 1
        && <HalfStar/>
      }

      { rating >= 1 && rating < 2
        && <StarIcon/> 
      }

      { rating >= 2 && rating < 3
        && <Flex justify="start" align="center">
            <StarIcon/> 
            <HalfStar/>
          </Flex> 
      }

      { rating >= 4 && rating < 5 
        && <Flex justify="start" align="center">
              <StarIcon/> 
              <StarIcon/>
            </Flex> 
      }

      { rating >= 5 && rating < 6
        && <Flex justify="start" align="center">
              <StarIcon/> 
              <StarIcon/>
              <HalfStar/>
            </Flex> 
      }

      { rating >= 6 && rating < 7
        && <Flex justify="start" align="center">
            <StarIcon/> 
            <StarIcon/>
            <StarIcon/>
          </Flex> 
      }

      { rating >= 7 && rating < 8
        && <Flex justify="start" align="center">
              <StarIcon/> 
              <StarIcon/>
              <StarIcon/>
              <HalfStar/>
            </Flex> 
      }

      { rating >= 8 && rating < 9
        && <Flex justify="start" align="center">
              <StarIcon/> 
              <StarIcon/>
              <StarIcon/>
              <StarIcon/>
            </Flex> 
      }

      { rating >= 9 && rating < 10
        &&<Flex justify="start" align="center">
            <StarIcon/> 
            <StarIcon/>
            <StarIcon/>
            <StarIcon/>
            <HalfStar/>
          </Flex> 
      }
    </>
  )
}


export default StarRating