import Link from 'next/link';
import { Flex } from '@chakra-ui/react';

interface ITag {
  topic: string;
}


export function Topic({ topic }: ITag) {
  return (
      <Flex justifyContent='center' mb='1' mr='1' px='2' bgColor='gray.100' textAlign='center' borderRightRadius='20px' borderLeftRadius='20px' borderColor='black'>
        <Link href={`/tag/${topic}`}>
          {topic}
        </Link>
      </Flex>
  );
}
