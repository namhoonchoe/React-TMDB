import React from 'react'
import { Flex, Text, Grid } from "@chakra-ui/react"

interface IProfileProps {
  profileInfo:any
  movieCredits:null|Array<any>
  seiresCredits:null|Array<any>
  loading:boolean
  error:boolean
}


const ProfilePresenter:React.FC<IProfileProps> = () =>  {
  return (
    <>
      <Flex>
        <Text>Hello</Text>
      </Flex>
    </>
  )
}


export default ProfilePresenter