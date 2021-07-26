import React from 'react'
import { Flex, 
  VStack, 
  Box, 
  Container,
  Text, 
  Spacer, 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure  } from "@chakra-ui/react"
import InfoImage from "@components/InfoImage";

interface IHeaderProps {
  detail:any,
  cast:any,
}

const DetailHeader:React.FC<IHeaderProps> = ({ detail, cast }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
  <>
    <VStack width={"100vw"} height={"40rem"} >
      <Flex justify="center" >
        <InfoImage
          borderRadius={"md"}
          imageType={"poster"}
          width={"15rem"}
          height={"21rem"}
          imageSource={detail.poster_path}
        />
        <VStack>
          <Container maxW="sm">
            <Text fontWeight="semibold" fontSize="3xl">{detail.original_title}</Text>
          </Container>
          <Container maxW="sm">
            <Flex>
              <Text mr={2}>{detail.release_date}</Text>
              <Text >{detail.status}</Text>
            </Flex>
            { detail.tagline !== "" 
              ? <VStack align="start">
                  <Text>{detail.tagline}</Text>                   
                    {detail.overview.length > 100 
                    ? <Container maxWidth="xs" maxHeight="xs">{detail.overview.substring(0, 100)}... 
                      <Button onClick={onOpen}>More</Button>
                      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Over View</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={6}>
                            {detail.overview}
                          </ModalBody>
                          <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                      </Container>
                    : <Container maxWidth="xs" maxHeight="xs">{detail.overview}</Container> 
                  }
                </VStack>
                : <VStack>
                    <Spacer/>
                    <Container maxWidth="xs">
                    {detail.overview.length > 100 
                    ? <Container maxWidth="xs" maxHeight="xs">{detail.overview.substring(0, 100)}... 
                      <Button onClick={onOpen}>More</Button>
                      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Over View</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={6}>
                            {detail.overview}
                          </ModalBody>
                          <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                      </Container>
                    : <Container maxWidth="xs" maxHeight="xs">{detail.overview}</Container> }
                    </Container>
                  </VStack>
                }              
            </Container>
            <Container maxW="sm">
              <VStack align="start">
                <Text>{detail.vote_average}/10</Text>
                <Flex>{detail.genres.map((genre:any) => (
                  <Box border="1px" borderRadius="lg" borderColor="lightgrey" mr={2} p={[0.25, 0.5]} >
                    <Text>{genre.name.toString()}</Text>
                  </Box>))}
                </Flex>
              </VStack>
            </Container>
          </VStack>
      </Flex>
      <Box 
        zIndex={"-1"}
        position="fixed"
        top={"0"}
        left={"0"}
        opacity={"0.7"}
        width="100%"
        height={"25rem"}
        bgSize="cover"
        bgImage = {
          detail.backdrop_path !== null 
          ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
          : "none" }
        bgPosition="top"
        bgRepeat="no-repeat"></Box>        
    </VStack>
  </>
  )
}


export default DetailHeader