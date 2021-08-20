import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectDiscoverInfoList, fetchMore,} from '@redux/discoverSlice';
import { Link } from "react-router-dom";
import { Grid ,Text, Flex, Button } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import InfoCard from '@components/InfoCard'

const Main:React.FC = () => {
  const [sectionType, setSectionType] = useState<string|undefined>("")
  const mainInfo = useSelector(selectDiscoverInfoList)
	const pathType = usePathTypeCheck()
  
  const dispatch = useDispatch()

	useEffect(() => {
    let mounted = true
	  const imageTypeChecker = () => {
	    if(pathType === "movie") {
        setSectionType("movie")
      } 
      if(pathType === "series") {
        setSectionType("series")
      }
	  }

    if(mounted) {
      imageTypeChecker()
    }

    return () => {
      mounted = false
    }

  },[pathType])

  return (
    <Flex direction="column" align="center" justify="start" 
        mx={3} px={3} border="1px" borderRadius="md" borderColor="gray.300">
      <Text fontSize="2xl" mt={1} mb={3} fontWeight="normal" alignSelf="start">Discover</Text>
      <Flex alignSelf="start">
        { mainInfo !== null && mainInfo.length > 0 &&
          <Grid templateColumns="repeat(6, 1fr)" gap="8" >  
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
      <Button size="lg" my={2} alignSelf="center" onClick={()=> dispatch(fetchMore())}>
        <Text>Fetch More</Text>
      </Button>
    </Flex>  
  )
}


export default Main