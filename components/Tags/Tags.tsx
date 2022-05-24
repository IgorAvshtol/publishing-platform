import { nanoid } from 'nanoid';
import { Flex, Spinner, Text } from '@chakra-ui/react';

import { Tag } from './Tag';
import { platformService } from 'services/platformService';


export function Tags() {
  const { data, isLoading, isError } = platformService.useGetAllTagsQuery('');

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