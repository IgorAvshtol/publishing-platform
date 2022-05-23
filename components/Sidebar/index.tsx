import { Divider, Flex, Text } from '@chakra-ui/react';

import { Tags } from '../Tags';
import { Links } from 'components/Links';
import { sidebarStyle } from 'styles/sidebar';
import { useAppSelector } from 'store/store';

export function Sidebar() {
  const { user } = useAppSelector(state => state.auth);

  return (
      <Flex direction='column' w={{ xl: '20%', lg: '20%', md: '100%', sm: '100%' }} sx={user ? sidebarStyle.forAutorized : sidebarStyle.forNotAutorized}>
        <Text fontSize='12px' fontWeight='bold'>DISCOVER MORE OF WHAT MATTERS TO YOU</Text>
        <Flex pt='4' wrap='wrap' justifyContent='flex-start'>
          <Tags/>
          <Divider w={user ? { lg: '83%', sm:'100%' } : '100%'} mt='2' mb='2' bgColor='gray.400'/>
          <Flex w='90%' display={{ lg:'flex', md: 'none', sm: 'none' }} wrap='wrap'>
            <Links/>
          </Flex>
        </Flex>
      </Flex>
  );
}