import { Button, Flex, Heading } from '@chakra-ui/react';

import { Animation } from '../Animation/Animation';

export function Title() {
  return (
      <Flex pos='relative' mt='48px' bgColor='green.300' h='450px' w='100%'>
        <Flex pos='relative' m='auto' direction='column' justifyContent='space-between' alignItems='start' w={{ xl: '60%', lg: '83%', md: '83%', sm: '75%' }}>
          <Heading as='h1' fontSize={{ xl: '8xl', lg: '7xl', md: '7xl', sm: '5xl' }}>
            Itransition.
          </Heading>
          <Heading as='h4' mt='10' fontWeight='light' fontSize={{ xl: '2xl', lg: '2xl', md: '3xl', sm: '2xl' }}>
            We’re a global software engineering company <br/> making success stories for over 20
            years
          </Heading>
          <Button variant='ghost' mt='10' bgColor='green.400' fontSize='xl' color='white' w='52' py='2' px='4' borderRightRadius='20px' borderLeftRadius='20px'>
            Start reading
          </Button>
        </Flex>
        <Animation/>
      </Flex>
  );
}