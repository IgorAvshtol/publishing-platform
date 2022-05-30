import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { useAppSelector } from 'store/store';
import { DropDownMenu } from '../../Menu';


export function Header() {
  const { user } = useAppSelector((state) => state.auth);

  return (
      <Flex w='50%' h='14' justifyContent='space-between' alignItems='center' fontSize={{ md: '16px', sm: '12px' }}>
        <Flex>
          <Link href='/'>
            <Image src='/images/logo.png' alt='main-logo' width={32} height={32}/>
          </Link>
          <Flex alignItems='center' pl='3'>Draft in {user?.username}</Flex>
        </Flex>
        <Flex justifyContent='center'>
          <DropDownMenu/>
        </Flex>
      </Flex>
  );
}
