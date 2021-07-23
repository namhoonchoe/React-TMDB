import React, { useState, useEffect } from 'react'
import InfoCard from './InfoCard'
import { useLocation, Link } from "react-router-dom";
import { Grid ,Text, Box } from "@chakra-ui/react"

type MovieData = []

interface ISectionInfo {
  title?:String
  sectionInfos:MovieData
}

const Section:React.FC<ISectionInfo> = ({title,sectionInfos}) => {
  const [sectionType, setSectionType] = useState<string>("")
	let location = useLocation().pathname

	const imageTypeChecker = () => {
		if (location.includes("movie")){
      setSectionType("movie")
    } else if(location.includes("tv")){
      setSectionType("series")
    } else if(location.includes("person")){
      setSectionType("person")
    } 
	}
	
	useEffect(() => {
    imageTypeChecker()
  },[location])

  return (
  <>
    <Box mx={3} >
      <Text fontSize="2xl" mb={3} >{title}</Text>
      <Grid templateColumns="repeat(6, 1fr)" gap="4" >
        {sectionInfos.map((data:any) => (
        <Link to={`/${sectionType}/${data.id}`}>
          <InfoCard
            key={data.id}
            title={data.original_title||data.original_name||data.name}
            posterPath={data.poster_path||data.profile_path}
            rating={data.vote_average}
            />
        </Link>
        ))}
      </Grid>
    </Box>  
  </>
  )
}

export default Section
