import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Grid ,Text, Box } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import InfoCard from '@components/InfoCard'

interface IMainProps {
  mainInfo:discoverInfo
}


const Main:React.FC<IMainProps> = ({ mainInfo }) => {
  const [sectionType, setSectionType] = useState<string|undefined>("")
	const pathType = usePathTypeCheck()
	
	useEffect(() => {
	const imageTypeChecker = () => {
	  if(pathType === "movie") {
      setSectionType("movie")
    } 
    if(pathType === "series") {
      setSectionType("series")
    } 
	}
    imageTypeChecker()
  },[pathType])

  return (
    <Box >
      <Text fontSize="xl" mb={3} fontWeight="normal">Discover</Text>
      { mainInfo !== null && mainInfo.length > 0 && 
        <Grid templateColumns="repeat(4, 1fr)" gap="8"> 
          {mainInfo.map((data:any) => (
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
      }
    </Box>  
  )
}


export default Main