import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectDiscoverInfoList, fetchMore,} from '@redux/discoverSlice';
import { Link } from "react-router-dom";
import { Grid ,Text, Flex, Button } from "@chakra-ui/react"
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import InfoCard from '@components/Layout/InfoCard'

const Main:React.FC = () => {
  const [sectionType, setSectionType] = useState<string|undefined>("")
  const mainInfo = useSelector(selectDiscoverInfoList)
	const pathType = usePathTypeCheck()
  
  const dispatch = useDispatch()

  const scrollToTop = () => {
    window.scrollTo({
      top:0,
      behavior: "smooth"
    })
  }

  const getNextPage = () => {
    dispatch(fetchMore())
    scrollToTop()
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
	  }

    if(mounted) {
      imageTypeChecker()
    }

    return () => {
      mounted = false
      scrollToTop()
    }

  },[pathType])

  return (
    <Flex direction="column" align="center" width="100%" height="100%" mt={2} px={3}>
      <Text fontSize="2xl" mb={3} fontWeight="semibold" alignSelf="start">Discover</Text>
        { mainInfo !== null && mainInfo.length > 0 &&
          <Grid templateColumns="repeat(auto-fit,minmax(10.5rem, 1fr))" columnGap="6" width="100%">  
            {mainInfo.map((data:any) => (
            <Link to={`/${sectionType}/${data.id}`}>
              <InfoCard
                key={data.id}
                title={data.title||data.name}
                posterPath={data.poster_path||data.profile_path}
                rating={data.vote_average}/>
            </Link>
              ))}
          </Grid>
        }
      <Button size="lg" my={2} p={3} alignSelf="center" onClick={()=> getNextPage()} height="max-content">
        <Text>Next Page</Text>
      </Button>
    </Flex>  
  )
}


export default Main