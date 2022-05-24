import { Flex, useDisclosure } from '@chakra-ui/react';

import { Sidebar } from 'components/Article/Sidebar';
import { Response } from 'components/Article/Response';
import { Navbar } from 'components/Navbar';
import { Content } from 'components/Article/Content';
import { Comments } from 'components/Comments/Comments';

export default function Article() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
      <Flex>
        <Flex w={{ xl: '75%', lg: '80%', sm: '100%' }} m='auto'>
          <Navbar/>
          <Flex minH='100vh' pos='relative' w={{ lg: '83%', sm: '100%' }} borderX={{ lg: '1px solid #CBD5E0' }}>
            <Flex w='100%' mt={{ lg: '12', sm: '6' }}>
              <Content/>
            </Flex>
            <Flex pos='fixed' w='100%' justifyContent='center' bottom={{ lg: '4', sm: '14' }} left={{ lg: '-16', sm: '0' }}>
              <Response onOpen={onOpen}/>
            </Flex>
          </Flex>
          <Flex w={{ lg: '20%' }} display={{ lg: 'block', sm: 'none' }} mt='24'>
            <Sidebar/>
          </Flex>
        </Flex>
        <Comments isOpen={isOpen} onClose={onClose}/>
      </Flex>
  );
}
