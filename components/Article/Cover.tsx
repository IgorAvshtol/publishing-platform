import { Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';

import lens from 'public/images/lens.webp';


export function Cover() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <>
        <Image
            layout='responsive'
            objectFit='cover'
            src={lens}
            alt='cover'
            onClick={onOpen}
            style={{ cursor: 'zoom-in' }}
        />
        <Modal onClose={onClose} size='6xl' isOpen={isOpen} isCentered>
          <ModalOverlay/>
          <ModalContent>
            <ModalBody>
              <Image
                  layout='responsive'
                  objectFit='cover'
                  src={lens}
                  alt='cover'
                  onClick={onOpen}
                  style={{ cursor: 'zoom-in' }}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
}