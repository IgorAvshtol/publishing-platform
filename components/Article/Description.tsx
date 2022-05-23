import { Flex, Text } from '@chakra-ui/react';

import { Cover } from './Cover';

interface IArticleDescription {
  title: string;
  description: string;
  body: string;
}

export function Description({ title, description, body }: IArticleDescription) {
  return (
      <Flex direction='column' w='100%' mt='4'>
        <Text fontSize='36'>{title}</Text>
        <Text fontSize='20'>{description}</Text>
        <Cover/>
        <Text pt='10' fontSize='18'>{body}</Text>
      </Flex>
  );
}