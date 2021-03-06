import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBookMark, removeBookMark, selectBookMark } from '@redux/bookMarkSlice'
import { Button, Text, useToast } from '@chakra-ui/react'

interface IBookMarkProps {
  bookMarkDetail:DetailInfo
  bookMarkId:number
  bookMarkType:string
}

const BookMark:React.FC<IBookMarkProps> = ({ bookMarkDetail, bookMarkType, bookMarkId }) => {  
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false)
  const bookMarks = useSelector(selectBookMark)
  const payload = { type:bookMarkType, id:bookMarkId, bookMarkInfo:bookMarkDetail }
  const dispatch = useDispatch()
  const toast = useToast()

  const toggleBookMark = () => {
    setIsBookMarked(!isBookMarked)
  }

  useEffect(() => {
    const bookMarkedCheck = () => {
      const { movieBookMarks, seriesBookMarks } = bookMarks
      if(bookMarkType==="movie") {
        const bookMarkIDs = movieBookMarks.map((bookMark) => bookMark['id'])
        if(bookMarkIDs.includes(bookMarkId)) {
          setIsBookMarked(true)
        }
      } else {      
        const bookMarkIDs = seriesBookMarks.map((bookMark) => bookMark['id'])
        if(bookMarkIDs.includes(bookMarkId)) {
          setIsBookMarked(true)
        }
      }
    }
    
    bookMarkedCheck() 
    }, [ bookMarkDetail, bookMarkType, bookMarkId, bookMarks])

  const bookMarkEvent = () => {
    if(isBookMarked) {
      toast({
        title: "BookMark Removed.",
        description: "We've removed this from bookmark.",
        position:"top",
        status: "info",
        duration: 5000,
        isClosable: true,
      })
      toggleBookMark()
      dispatch(removeBookMark(payload))
    } else {
      toast({
        title: "BookMark Added.",
        description: "We've Added this to bookmark.",
        position:"top",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      toggleBookMark()
      dispatch(addBookMark(payload))
    }
  }

  return (
    <>
      { isBookMarked 
        ? <Button color="green.300" backgroundColor="transparent" onClick={bookMarkEvent}>
            <Text>Remove BookMark</Text>
          </Button>
        : <Button color="green.300" backgroundColor="transparent" onClick={bookMarkEvent}>
            <Text>Add BookMark</Text>
          </Button>
      }
    </>
  )
}


export default BookMark