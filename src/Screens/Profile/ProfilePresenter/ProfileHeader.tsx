import React from 'react'
import { Flex, HStack, VStack, Box, Text, useColorMode } from '@chakra-ui/react'
import ModalBox from '@components/Layout/ModalBox'
import InfoImage from '@components/Layout/InfoImage'

interface IHeaderProps {
  name?:string
  profileSource?:string
  bioGraphy:string
}

const ProfileHeader:React.FC<IHeaderProps> = ({ profileSource, name, bioGraphy }) => {
  const colorMode = useColorMode().colorMode

  return (
    <>
      <Flex width="100%" height="60vh" justify="center" align="center" backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'} >
        <HStack width="80%" height="60vh">
          <InfoImage
            width="20%"
            height="80%"
            imageType="portrait"
            imageSource={profileSource}
            borderRadius="lg"
          />
          <VStack width="80%" height="80%" align="start" justify="space-between" pl="2em" pt="0.5em">
            <Text fontSize="2xl" fontWeight="semibold">{name}</Text>
            { bioGraphy !== ""  &&
            <>
            {bioGraphy.length > 200 
            ? <Flex direction="column" align="start" width="35%">
                <Flex direction="row" justify="space-between" align="baseline">
                  <Text fontSize="lg" fontWeight="semibold">Biography</Text>
                  <ModalBox modalcontent={bioGraphy}/> 
                </Flex>
                <Text>
                  {bioGraphy.substring(0, 200)}...
                </Text>
              </Flex>
            : <Box width="35%">
                <Text>
                {bioGraphy}
                </Text>
              </Box> }    
            </>
            }
          </VStack>
        </HStack>
      </Flex>
    </>
  )
}



export default ProfileHeader