import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';

export default function Custom404() {
  return (
      <Flex w='100%' h='100vh'>
        <Image src='/images/404.webp' layout='fill' alt='404-error-cover'/>
      </Flex>
  );
};
