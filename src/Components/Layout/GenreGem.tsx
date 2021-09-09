import React, { useState, useEffect } from 'react'
import { genreApi } from '@api'
import { Text, Box, Fade } from "@chakra-ui/react"

interface IGenreProps {
  genreId:number
  genreType:string
}
const GenreGem:React.FC<IGenreProps> = ({ genreId, genreType }) => {
  const [genreList, setGenreList] = useState<Array<any>>([])
  const [genre, setGenre] = useState<any>(null)
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true

    const getGenreList = () => {
      if(genreType === "movie") {
        const getMovieGenre = async() => {
          try {
            const { data:{ genres } } = await genreApi.movieGenres()
            setGenreList(genres)
          } catch {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        getMovieGenre()
      }

      if(genreType === "series") {
        const getSeiresGenre = async() => {
          try {
            const { data:{ genres } } = await genreApi.seriesGenres()
            setGenreList(genres)
          } catch {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        getSeiresGenre()
      }
    }

    const extractGenre = (genreId:number) => {
      if(genreList !== null) {
        const [filtered] = genreList.filter((genre) => genre.id === genreId)
        setGenre(filtered)
      }
    } 

    if(mounted) {
      getGenreList()
      extractGenre(genreId)
    }

    return () => {
      mounted = false
    }
  }, [genreId,genreList,genreType])

  return (
    <>
      { loading === false && 
        <Fade in={!loading} >
          <Box mr={2} p={1.5} borderRadius="xl" boxSize="max-content" borderColor="white" border="1px" _hover={{backgroundColor:"gray.200"}} >
            <Text _hover={{color:"gray.600"}} fontSize="md" fontWeight="hairline">{genre.name}</Text>
          </Box>
        </Fade>
      }

      { error ? <p>An error has occured</p>: null }
    </>
  )
}

export default GenreGem
