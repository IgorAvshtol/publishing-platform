import { Flex } from '@chakra-ui/react';

import { Sidebar } from 'components/Article/Sidebar';
import { Navbar } from 'components/Navbar';
import { Content } from 'components/Article/Content';

export default function Article() {
  return (
      <Flex>
        <Flex w={{ xl: '75%', lg: '80%', sm: '100%' }} m='auto'>
          <Navbar/>
          <Flex minH='100vh' pos='relative' w={{ lg: '83%', sm: '100%' }} mb='0' borderX={{ lg: '1px solid #CBD5E0' }}>
            <Flex w='100%' mt={{ lg: '12', sm: '6' }}>
              <Content/>
            </Flex>
            {/*<Flex pos='sticky' w='100%' justifyContent='center' bottom={{ lg: '4', sm: '14' }} left='0'>*/}
              {/*<Response setIsOpen={setIsOpen}/>*/}
            {/*</Flex>*/}
          </Flex>
          <Flex w={{ lg: '20%' }} display={{ lg: 'block', sm: 'none' }} mt='24'>
            <Sidebar/>
          </Flex>
        </Flex>
        {/*{isOpen && <Comments setIsOpen={setIsOpen} />}*/}
      </Flex>
  );
}