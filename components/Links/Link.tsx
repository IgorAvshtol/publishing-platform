import LinkNext from 'next/link';
import { Text } from '@chakra-ui/react';

interface ILink {
  link: string;
}

export function Link({ link }: ILink) {
  return (
      <LinkNext href='/'>
        <Text fontSize='14px' pr='6' textColor='gray.400' cursor='pointer'>{link}</Text>
      </LinkNext>
  );
}