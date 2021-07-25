import React from "react";
import { Flex, 
        VStack, 
        Box, 
        Container,
        Portal, 
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
import LoadingSpinner from "@components/LoadingSpinner"

interface IDetailProps {
  detail:any
  cast:any
  similar:any
  loading:boolean
  error:boolean
}

const DetailPresenter:React.FC<IDetailProps> = ({ detail ,cast ,similar ,error,loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return(
  <>
    { loading 
    ? <LoadingSpinner/> 
    : (
      <>
      <VStack>
        <Portal appendToParentPortal={false}>
          <Box
            position="fixed"
            top="0"
            opacity={"0.1"}
            width={"100vw"}
            height={"50vh"}
            bgSize="cover"
            bgImage = {
              detail.backdrop_path !== null 
              ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
              : "none" }
            bgPosition="top"
            bgRepeat="no-repeat"
          > </Box>
        </Portal>
        <Flex justify="start">
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
                      {detail.overview.length > 180 
                      ? <Container maxWidth="xs" maxHeight="xs">{detail.overview.substring(0, 100)}... 
                        <Button onClick={onOpen}>Open Modal</Button>
                        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Create your account</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                            </ModalBody>
                            <ModalFooter>
                              <Button colorScheme="blue" mr={3}>
                                Save
                              </Button>
                              <Button onClick={onClose}>Cancel</Button>
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
                      {detail.overview.length > 180 
                        ? <Container maxWidth="xs" maxHeight="xs">{detail.overview.substring(0, 100)}... 
                                  <Button onClick={onOpen}>Open Modal</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

                          </Container>
                        : <Container maxWidth="xs" maxHeight="xs">{detail.overview}</Container> 
                      }
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
      </VStack>
      </>
    ) }

    { error ? <p>"An error has occured"</p>: null }
	</>
  )
};

export default DetailPresenter;
