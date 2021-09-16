import React from 'react'
import { Flex, HStack, VStack, Text } from '@chakra-ui/react'
import InfoImage from '@components/Layout/InfoImage'

interface IHeaderProps {
  name?:string
  profileSource?:string
  bioGraphy:string
}

const ProfileHeader:React.FC<IHeaderProps> = ({ profileSource, name, bioGraphy }) => {
  return (
    <>
      <Flex width="100%" height="60vh" backgroundColor="cyan.400" justify="center" align="center" >
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
            <Flex direction="column" justify="start" mt="3em" width="35%">
              <Text fontWeight="semibold" fontSize="lg">BioGraphy</Text>
              <Flex>
                <Text>{bioGraphy.substring(0,180)}...</Text>
              </Flex>
            </Flex>
            }
          </VStack>
        </HStack>
      </Flex>
    </>
  )
}


export default ProfileHeader