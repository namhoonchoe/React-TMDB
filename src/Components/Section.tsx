import React from 'react'
import { Grid ,Text, Box } from "@chakra-ui/react"
import InfoCard from './InfoCard'


type MovieData = []

interface ISectionInfo {
  title?:String
  sectionInfos:MovieData
}



const Section:React.FC<ISectionInfo> = ({title,sectionInfos}) => {
  return (
  <>
    <Box mx={3} mt={4} p={2}>
      <Text fontSize="2xl" >{title}</Text>
      <Grid templateColumns="repeat(5, 1fr)" >
        {sectionInfos.map((data:any) => (<InfoCard
        title={data.original_title||data.original_name||data.name}
        posterPath={data.poster_path||data.profile_path}
        rating={data.vote_average}
        />))}
      </Grid>
    </Box>  
  </>
  )
}

export default Section
