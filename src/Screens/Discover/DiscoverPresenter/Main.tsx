import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Grid ,Text, Flex, Button } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import InfoCard from '@components/InfoCard'

interface IMainProps {
  mainInfo:discoverInfo
  fetchMore:() => void
}


const Main:React.FC<IMainProps> = ({ mainInfo, fetchMore }) => {
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
    <Flex direction="column" align="center" justify="start" 
          mx={3} px={3} border="1px" borderRadius="md" borderColor="gray.300">
      <Text fontSize="2xl" mt={1} mb={3} fontWeight="normal" alignSelf="start">Discover</Text>
      <Flex alignSelf="start">
        { mainInfo !== null && mainInfo.length > 0 &&
          <Grid templateColumns="repeat(5, 1fr)" gap="8"> 
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
      </Flex>
      <Button size="lg" mt={2} alignSelf="center" onClick={()=> fetchMore()}>
        <Text>Fetch More</Text>
      </Button>
    </Flex>  
  )
}


export default Main