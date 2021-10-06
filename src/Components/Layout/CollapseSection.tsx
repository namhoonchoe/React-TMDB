import React, { useState, useEffect } from 'react'
import InfoCard from './InfoCard'
import { Link } from "react-router-dom";
import { Button, Box, Text, Flex, Grid, Collapse, Fade } from '@chakra-ui/react'
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'

interface ICollapseSectionProps {
  title:string
  sectionInfoType?:string
  sectionInfos:Array<any>
}

const CollapseBox:React.FC<ICollapseSectionProps> = ({ title, sectionInfos, sectionInfoType }) => {
  const [seeAll, setSeeAll] = useState<boolean>(false)
  const [sectionType, setSectionType] = useState<string|undefined>("")
	const pathType = usePathTypeCheck()
	
  const toggleView = () => {
    setSeeAll(!seeAll)
  }

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
    <Box width="100%">
      <Flex width="100%" align="center" justify="space-between" my={2} >
        <Text fontSize="2xl" mb={3} fontWeight="semibold" >{title}</Text>
          { seeAll 
            ? <Button onClick={() => toggleView()} backgroundColor="transparent">
                <Text fontSize={{lg:"md", xl:"lg"}}>Collapse </Text>
              </Button>
            : <Button onClick={() => toggleView()} backgroundColor="transparent">
                <Text fontSize={{lg:"md", xl:"lg"}}>See All </Text>
              </Button>
          }
      </Flex>
        {seeAll
          ? <Collapse in={seeAll}>
              <Grid templateColumns="repeat(auto-fill,minmax(10.5rem, 1fr))" columnGap="6" alignItems="start" >
                {sectionInfos.map((data:any) => (
                  <Link to={`/${sectionType}/${data.id}`} key={data.id}>
                  <InfoCard
                    title={data.title||data.name}
                    posterPath={data.poster_path||data.profile_path}
                    rating={data.vote_average}
                    />
                  </Link>))}
                </Grid>
            </Collapse>
          : <Fade in={!seeAll}>
              <Grid templateColumns="repeat(auto-fill,minmax(10.5rem, 1fr))" columnGap="6" alignItems="start" width="100%" >
                {sectionInfos.slice(0,10).map((data:any) => (
                  <Link to={`/${sectionType}/${data.id}`} key={data.id}>
                  <InfoCard
                    title={data.title||data.name}
                    posterPath={data.poster_path||data.profile_path}
                    rating={data.vote_average}
                    />
                  </Link>))}
              </Grid>
          </Fade>
        }
    </Box>
  )
}

export default CollapseBox