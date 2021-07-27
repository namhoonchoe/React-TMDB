import React, { useState } from 'react'
import { Button, Text, useToast  } from '@chakra-ui/react'

interface IBookMarkProps {
  bookMarkId?:number
  bookMarkType?:string
}

const BookMark:React.FC<IBookMarkProps> = ({ bookMarkId, bookMarkType }) => {
  const [bookMark, setBookMark] = useState<boolean>(false)

  const toast = useToast()

  const toggleBookMark = () => {
    setBookMark(!bookMark)
  }

  const bookMarkEvent = () =>{
    if(bookMark) {
      toast({
        title: "BookMark Removed.",
        description: "We've removed this from bookmark.",
        position:"top",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      toggleBookMark()
    } else {
      toast({
        title: "BookMark Added.",
        description: "We've Added this to bookmark.",
        position:"top",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      toggleBookMark()
    }

  }


  return (
    <>
      { bookMark ?
          <Button color="green.300" onClick={bookMarkEvent} >
            <Text>Remove BookMark</Text>
          </Button>
        : <Button color="green.300" onClick={bookMarkEvent}>
            <Text>Add BookMark</Text>
          </Button>
      }
    </>
  )
}


export default BookMark