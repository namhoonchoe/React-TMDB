import React from 'react'
import  { Button,
          Text,
          Modal,
          ModalOverlay,
          ModalContent,
          ModalHeader,
          ModalFooter,
          ModalBody,
          ModalCloseButton,
          useDisclosure  } from "@chakra-ui/react"

interface IModalProps {
  modalcontent:string
}


const ModalBox:React.FC<IModalProps> = ({ modalcontent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} backgroundColor="transparent" fontWeight="hairline">
        <Text>More</Text>
      </Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Over View</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {modalcontent}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} backgroundColor="transparent">
                <Text>Close</Text>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  )
}



export default ModalBox