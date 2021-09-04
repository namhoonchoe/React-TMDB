import React, { useState, useEffect } from 'react'
import { genreApi } from '@api'
import LoadingSpinner from '@components/LoadingSpinner'
import { Text, Box } from "@chakra-ui/react"

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
      { loading 
        ? <LoadingSpinner/> 
        : <Box mx={1}>
            <Text>{genre.name}</Text>
          </Box>
      }
          
      { error ? <p>An error has occured</p>: null }
    </>
  )
}

export default GenreGem
