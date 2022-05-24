import { formatDistance } from 'date-fns';
import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react';

import { useAppSelector } from 'store/store';
import { IAuthor } from 'lib/interfaces';
import { EditMenu } from './EditMenu';

interface ICommentProps {
  createdAt: string;
  body: string;
  author: IAuthor;
  id: number;
}


export function Comment({ author, createdAt, body, id }: ICommentProps) {
  const { user } = useAppSelector((state) => state.auth);
  const correctDate = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });

  return (
      <Flex direction='column' mt='4' pos='relative'>
        <Flex w='100%' justifyContent='space-between'>
          <Flex className='flex'>
            <Avatar src={author.image}/>
            <Box pl='2'>
              <Text fontSize='16px' fontWeight='medium'>{author.username}</Text>
              <Text fontSize='12px' color='gray.300'>{correctDate}</Text>
            </Box>
          </Flex>
          {user?.username === author?.username && <EditMenu id={id}/>}
        </Flex>
        <Box my='2' fontSize='12px'>{body}</Box>
        <Divider mt='9' w='100%' bgColor='gray.300'/>
      </Flex>
  );
}
