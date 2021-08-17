import React, { useState, useEffect, useRef } from 'react'
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
  const [memoization, setMemoization] = useState<discoverInfo>(null)
	const pathType = usePathTypeCheck()
  
  let discoverRef = useRef<any>(null)
  let pathRef = useRef<string>("")

 

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

    const pathChangeDetector = () => {
      if(pathType !== pathRef.current) {
        return discoverRef.current = null
      }
    }
  
    const stateMemoization = () => {
      if(discoverRef.current === null) {
        return setMemoization(mainInfo)
      } else {
        return setMemoization(discoverRef.current)
      }
    }

    if(mounted) {
      imageTypeChecker()
      pathChangeDetector()
      stateMemoization()
    }

    return () => {
      mounted = false
      discoverRef.current = mainInfo
      pathRef.current = pathType
    }

  },[memoization,mainInfo,pathType])

  return (
    <Flex direction="column" align="center" justify="start" 
        mx={3} px={3} border="1px" borderRadius="md" borderColor="gray.300">
      <Text fontSize="2xl" mt={1} mb={3} fontWeight="normal" alignSelf="start">Discover</Text>
      <Flex alignSelf="start">
        { memoization !== null && memoization.length > 0 &&
          <Grid templateColumns="repeat(6, 1fr)" gap="8" >  
            {memoization.map((data:any) => (
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
      <Button size="lg" my={2} alignSelf="center" onClick={()=> fetchMore()}>
        <Text>Fetch More</Text>
      </Button>
    </Flex>  
  )
}


export default Main