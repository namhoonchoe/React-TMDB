import React, { useState, useEffect } from 'react'
import InfoCard from './InfoCard'
import { Link } from "react-router-dom";
import { Grid ,Text, Box, Flex } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'

type MovieData = []

interface ISectionInfo {
  title?:string
  sectionInfoType?:string
  sectionInfos:MovieData
}

const Section:React.FC<ISectionInfo> = ({ title, sectionInfos, sectionInfoType }) => {
  const [sectionType, setSectionType] = useState<string|undefined>("")
	const pathType = usePathTypeCheck()
	
	useEffect(() => {
    let mounted = true
	  const imageTypeChecker = () => {
		  if(pathType === "movie") {
        setSectionType("movie")
      } 
      if(pathType === "series") {
        setSectionType("series")
      } 
      if(pathType === "person") {
        setSectionType("person")
      } 
      if(pathType === "search") {
        setSectionType(sectionInfoType)
      }
      if(pathType === "bookmark") {
        setSectionType(sectionInfoType)
      }  
    }
    if(mounted) {
      imageTypeChecker()
    }

    return () => {
      mounted = false
    }
  },[pathType,sectionInfoType])

  return (
  <>
    <Box width="100%">
      <Text fontSize="2xl" mb={3} fontWeight="semibold">{title}</Text>
      {sectionInfos.length > 6 
        ? <Grid templateColumns="repeat(auto-fit,minmax(10.5rem, 1fr))" columnGap="6" alignItems="start">
          {sectionInfos.map((data:any) => (
            <Link to={`/${sectionType}/${data.id}`} key={data.id}>
            <InfoCard
              title={data.title||data.name}
              posterPath={data.poster_path||data.profile_path}
              rating={data.vote_average}
              />
            </Link>))}
          </Grid>
        : <Flex>
          {sectionInfos.slice(0,5).map((data:any) => (
          <Box mr={6}>
            <Link to={`/${sectionType}/${data.id}`} key={data.id}>
            <InfoCard
              title={data.title||data.name}
              posterPath={data.poster_path||data.profile_path}
              rating={data.vote_average}
              />
            </Link>
          </Box>))}
          </Flex>      
      }
    </Box>  
  </>
  )
}

export default Section
