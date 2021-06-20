import React from 'react'
import { Grid ,Text, List} from "@chakra-ui/react"
import InfoCard from './InfoCard'


interface ISectionInfo {
    title:String
    sectionInfos:IMovieData
}



const Section:React.FC<ISectionInfo> = ({title,sectionInfos}) => {
    return (
        <>
        <Text fontSize="2xl" mx={2}>{title}</Text>
        {sectionInfos.map((movie:any) => (<InfoCard 
            title={movie.title}
            posterPath={movie.poster_path}
            />))}
        </>
    )
}

export default Section
