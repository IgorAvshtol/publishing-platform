import { Flex } from '@chakra-ui/react';

import { Title } from './Title';
import { Articles } from 'components/Articles';
import { Sidebar } from 'components/Sidebar';
import { useAppSelector } from 'store/store';
import { Navbar } from '../Navbar';
import { ArticlesContainer } from '../Articles/ArticlesContainer';

export function Main() {
  const { user } = useAppSelector(state => state.auth);

  return (
      <Flex direction='column' justifyContent='space-between' w='100%'>
        {!user ? (
            <>
              <Title/>
              <Flex direction='column' justifyContent='space-between' w={{ xl: '60%', md: '83%', sm: '75%' }} m='auto' pt='3'>
                <Flex pt='4' justifyContent='space-between' alignItems={{ xl: 'flex-start' }} direction={{ xl: 'row', lg: 'row', md: 'column-reverse', sm: 'column-reverse' }}>
                  <Articles/>
                  <Sidebar/>
                </Flex>
              </Flex>
            </>
        ) : (
            <Flex m='auto' w={{ xl: '75%', lg: '80%', md: '83%', sm: '83%' }}>
              <Navbar/>
              <Flex justifyContent='center' alignItems='start' w={{ xl: '75%', lg: '75%', md: '100%', sm: '100%' }} minH='100vh' mb={{ lg: '0', sm: '12' }} borderX={{ lg: '1px solid #CBD5E0' }}>
                <Flex w='100%' pt='4' justifyContent='center' alignItems='center' direction={{ md: 'column', sm: 'column' }}>
                  <Sidebar/>
                  <ArticlesContainer/>
                </Flex>
              </Flex>
            </Flex>
        )
        }
      </Flex>
  );
}