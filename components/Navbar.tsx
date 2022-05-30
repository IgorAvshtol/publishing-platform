import React from 'react';
import Link from 'next/link';
import { Divider, Flex } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { BsBookmark, BsPencilSquare } from 'react-icons/bs';

import logo from 'public/images/logo.png';
import { useAppSelector } from 'store/store';
import { ResponseImage } from './ResponseImage';
import { DropDownMenu } from './Menu';


export function Navbar() {
  const { user } = useAppSelector((state) => state.auth);

  return (
      <Flex bgColor='green.200' w={{ xl: '16', lg: '16', md: '100%', sm: '100%' }} left='0' bottom='0' justifyContent={{ xl: 'center', lg: 'space-around', md: 'center', sm: 'center' }}
            alignItems={{ xl: 'center', lg: 'center', sm: 'center' }}
            zIndex='10' pos={{ xl: 'static', lg: 'static', md: 'fixed', sm: 'fixed' }} h={{ lg: '100%', md: '12', sm: '12' }} borderTop={{ lg: 'none', sm: '1px solid #CBD5E0' }}
      >
        <Flex direction={{ xl: 'column', lg: 'column', md: 'row', sm: 'row' }} alignItems='center' justifyContent={user ? { md: 'space-around', sm: 'space-between' } : { md: 'space-around', sm: 'space-center' }}
              bottom='0' pos={{ md: 'fixed', sm: 'fixed' }} w={{ xl: '16', lg: '16', md: '83%', sm: '83%' }} h={{ xl: '100%', lg: '100vh', md: '12', sm: '12' }}>
          {user && <ResponseImage src={logo} alt='logo' w='9' h='9'/>}
          <Flex w={{ lg: '100%', md: '30%', sm: '40%' }} direction={{ xl: 'column', lg: 'column', md: 'row', sm: 'row' }} h='60' justifyContent='space-between' alignItems='center'>
            <Link href='/'>
              <a>
                <AiOutlineHome size='29'/>
              </a>
            </Link>
            <Link href='/'>
              <a>
                <BsBookmark size='26'/>
              </a>
            </Link>
            <Divider my='4' w='83%' bgColor='gray.300' display={{ xl: 'block', lg: 'block', md: 'none', sm: 'none' }}/>
            <Link href='/new-article'>
              <a>
                <BsPencilSquare size='26'/>
              </a>
            </Link>
          </Flex>
          {user && <DropDownMenu/>}
        </Flex>
      </Flex>
  );
}
