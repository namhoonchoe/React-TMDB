import React from 'react'
import { Image,Box} from "@chakra-ui/react"

interface IInfoProps {
    title:string
    posterPath:string
   // rating:number
}


const InfoCard:React.FC<IInfoProps> =({title,posterPath})=> {
    return (
        <>
            <Box>
                <Image src={`https://image.tmdb.org/t/p/w300${posterPath}`}/>
            </Box>
            <Box>
                {title}
            </Box>
        </>
    )
}


export default InfoCard