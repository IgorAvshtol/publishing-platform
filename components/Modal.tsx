import { Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useAppDispatch, useAppSelector } from 'store/store';
import { isSignInModalOpen, isSignUpModalOpen } from 'store/auth/authSlice';

interface IModal {
  children: ReactNode;
}


export function VerticallyCenter({ children }: IModal) {
  const dispatch = useAppDispatch();
  const { onClose } = useDisclosure();
  const { signInModalOpen, signUpModalOpen } = useAppSelector((state) => state.auth);

  const onCloseModal = () => {
    signInModalOpen && dispatch(isSignInModalOpen());
    signUpModalOpen && dispatch(isSignUpModalOpen());
    onClose();
  };

  return (
      <>
        <Modal onClose={onCloseModal} isOpen={signInModalOpen ? signInModalOpen : signUpModalOpen} isCentered preserveScrollBarGap autoFocus={false}>
          <ModalOverlay/>
          <ModalContent bgColor='green.100' w='300px' pb='4' overflow='auto'>
            <ModalBody>
              {children}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
}
