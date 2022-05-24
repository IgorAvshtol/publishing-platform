import Link from 'next/link';
import Image from 'next/image';
import { Button, Flex } from '@chakra-ui/react';

import { headerStyles } from 'styles/header';
import { useAppDispatch, useAppSelector } from 'store/store';
import { isSignInModalOpen, isSignUpModalOpen } from 'store/auth/authSlice';

interface IHeader {
  purpose: boolean;
}


export function Header({ purpose }: IHeader) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const onSignInBtnClick = () => {
    dispatch(isSignInModalOpen());
  };

  const onSignUpBtnClick = () => {
    dispatch(isSignUpModalOpen());
  };

  return (
      <header>
        <Flex sx={!user ? purpose ? headerStyles.white : headerStyles.green : { display: 'none' }}>
          <Flex w={{ xl: '60%', md: '83%', sm: '75%' }} direction='row' justifyContent='center'>
            <Flex w='100%' justifyContent='space-between' alignItems='center' pos='relative'>
              <Link href='/'>
                <Image src='/images/logo.png' alt='main-logo' width={32} height={32}/>
              </Link>
              <Flex justifyContent='space-between' alignItems='center'>
                <Button disabled={purpose} textColor={purpose ? 'green.300' : 'white'} variant='ghost' onClick={onSignInBtnClick}>
                  Sign In
                </Button>
                <Button disabled={purpose} textColor={purpose ? 'green.300' : 'white'} variant='ghost' onClick={onSignUpBtnClick}>
                  Sign Up
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </header>
  );
}
