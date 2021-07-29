import React, { useState, useEffect } from 'react'
import InfoCard from './InfoCard'
import { Link } from "react-router-dom";
import { Grid ,Text, Box } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'

type MovieData = []

interface ISectionInfo {
  title?:String
  sectionInfos:MovieData
}

const Section:React.FC<ISectionInfo> = ({title,sectionInfos}) => {
  const [sectionType, setSectionType] = useState<string>("")
	const pathType = usePathTypeCheck()

	const imageTypeChecker = () => {
		if (pathType === "movie") {
      setSectionType("movie")
    } else if(pathType === "series"){
      setSectionType("tv")
    } else if(pathType === "person"){
      setSectionType("person")
    } 
	}
	
	useEffect(() => {
    imageTypeChecker()
    return () => {
      imageTypeChecker()
    }
  },[pathType])

  return (
  <>
    <Box>
      <Text fontSize="2xl" mb={3} fontWeight="semibold" >{title}</Text>
      <Grid templateColumns="repeat(6, 1fr)" gap="8" >
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
