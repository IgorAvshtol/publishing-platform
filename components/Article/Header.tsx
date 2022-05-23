import { format } from 'date-fns';
import { Avatar, Button, Flex, Tag, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { nanoid } from 'nanoid';

import { useAppSelector } from 'store/store';
import { ResponseImage } from '../ResponseImage';
import like from 'public/images/like.png';
import dislike from 'public/images/dislike.png';
import add from 'public/images/add.svg';
import edit from 'public/images/edit.png';

interface IArticleHeader {
  slug: string;
  avatar: string;
  author: string;
  tagList: string[];
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
}

export function Header({
                         author,
                         createdAt,
                         tagList,
                         favorited,
                         favoritesCount,
                         slug,
                       }: IArticleHeader) {
  const { user } = useAppSelector((state) => state.auth);
  const correctDate = format(new Date(createdAt), 'MMMd');

  return (
      <Flex alignItems={{ md: 'center', sm: 'start' }} justifyContent='space-between' w='100%'>
        <Flex w='67%' alignItems='start'>
          <Avatar src={user?.image} size='md'/>
          <Flex ml={{ md: '8', sm: '2' }} direction='column' w='100%'>
            <Text fontWeight='medium' fontSize='18'>{author}</Text>
            <Flex pt={{ md: '2', sm: '0' }} w='100%'>
              <Text fontSize={{ md: '16', sm: '14' }}>{correctDate}</Text>
              {tagList.length > 0 && (
                  <>
                    <Text pl='1' className='pl-1'>·</Text>
                    <Flex wrap='wrap' w='100%' color='gray.300'>
                      {tagList.map((tag) => (
                          <Link
                              href='/'
                              key={nanoid()}
                          >
                            <Tag mb='1' ml='1' bgColor='gray.200' color='gray.400' rounded='full' fontSize={{ md: '16', sm: '12' }}>{tag}</Tag>
                          </Link>
                      ))}
                    </Flex>
                  </>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex w='14' direction='column' alignItems='start'>
          <Button
              display='flex' w='100%' bgColor='green.200' justifyContent='space-between' alignItems='center' px='1.5' h='8' rounded='full'
          >
            <ResponseImage src={favorited ? like : dislike} w='3' alt='favourite'/>
            <Text fontSize={{ md: '14', sm: '12' }}>{favoritesCount}</Text>
          </Button>
          {user?.username === author && (
              <Flex w='100%' justifyContent='space-between'>
                <ResponseImage src={add} w='6' pt='2' alt='add-to-favourite'/>
                <Link href={`/update-${slug}`}>
                  <ResponseImage src={edit} w='6' pt='2' alt='edit-this-article'/>
                </Link>
              </Flex>
          )}
        </Flex>
      </Flex>
  );
}
