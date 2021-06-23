import React from 'react'
import { Grid ,Text, Box } from "@chakra-ui/react"
import InfoCard from './InfoCard'


interface ISectionInfo {
  title:String
  sectionInfos:IMovieData
}



const Section:React.FC<ISectionInfo> = ({title,sectionInfos}) => {
  return (
  <>
    <Box mx={3} mt={4} p={2}>
      <Text fontSize="2xl" >{title}</Text>
      <Grid templateColumns="repeat(5, 1fr)" >
          {sectionInfos.map((movie:any) => (<InfoCard
          title={movie.original_title}
          posterPath={movie.poster_path}
          />))}
      </Grid>
    </Box>  
  </>
  )
}

export default Section
