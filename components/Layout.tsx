import { Flex } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import useSWR from 'swr';

import { Header } from './Header';
import { VerticallyCenter } from './Modal';
import { SignInForm } from './SignInForm';
import { useAppDispatch, useAppSelector } from 'store/store';
import { SignUpForm } from './SignUpForm';
import { IUserData } from 'lib/interfaces';
import { getUserFromLocalStorage } from 'services/localStorage';
import { setCurrentUser } from 'store/auth/authSlice';

interface ILayout {
  children: ReactNode;
}

export function Layout({ children }: ILayout) {
  const dispatch = useAppDispatch();
  const { data: currentUser } = useSWR<IUserData>('userData', getUserFromLocalStorage);

  const { signInModalOpen, signUpModalOpen } = useAppSelector((state) => state.auth);
  const [purpose, setPurpose] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY > 350) {
      setPurpose(true);
    } else {
      setPurpose(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  useEffect(() => {
    if (currentUser) dispatch(setCurrentUser(currentUser));
  }, [dispatch, currentUser]);

  return (
      <Flex flexDirection='column'>
        <Header purpose={purpose}/>
        <VerticallyCenter>
          {signInModalOpen && <SignInForm/>}
          {signUpModalOpen && <SignUpForm/>}
        </VerticallyCenter>
        {children}
      </Flex>
  );
}
