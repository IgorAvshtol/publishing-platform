import { nanoid } from 'nanoid';
import { Flex, Spinner, Text } from '@chakra-ui/react';

import { Tag } from './Tag';
import { tagsService } from 'services/tagsService';


export function Tags() {
  const { data, isLoading, isError } = tagsService.useGetAllTagsQuery('');

  return (
      <Flex w='100%' wrap='wrap' justifyContent='center'>
        {isError &&
            <Flex justifyContent='center' alignItems='center'>
              <Text fontSize='14px'>Sorry, tag field is not available now!</Text>
            </Flex>
        }
        {isLoading && <Spinner w={10}/>}
        <Flex wrap='wrap' justifyContent='start'>
          {data?.tags.map((tag) => <Tag key={nanoid()} tag={tag}/>)}
        </Flex>
      </Flex>
  );
}
