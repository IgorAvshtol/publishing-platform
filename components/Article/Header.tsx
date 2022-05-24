import { format } from 'date-fns';
import { Avatar, Button, Flex, Tag, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import { BsFillPencilFill, BsListCheck, BsSuitHeartFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { useAppSelector } from 'store/store';
import { platformService } from 'services/platformService';

interface IArticleHeader {
  slug: string;
  avatar: string;
  author: string;
  tagList: string[];
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
}


export function Header({ author, createdAt, tagList, favorited, favoritesCount, slug, avatar }: IArticleHeader) {
  const router = useRouter();
  const { index } = router.query;
  const { user } = useAppSelector((state) => state.auth);
  const [like] = platformService.useLikeMutation();
  const [dislike] = platformService.useDislikeMutation();

  const correctDate = format(new Date(createdAt), 'MMMd');

  const onLikeButtonClickHandler = async () => {
    if (!favorited) {
      await like(index as string);
    } else {
      await dislike(index as string);
    }
  };

  return (
      <Flex alignItems={{ md: 'center', sm: 'start' }} justifyContent='space-between' w='100%'>
        <Flex w='67%' alignItems='start'>
          <Avatar src={avatar} size='md'/>
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
              _hover={{bg:'green.100'}}
              onClick={onLikeButtonClickHandler}
          >
            <BsSuitHeartFill size='12' color={favorited ? 'red' : 'black'}/>
            <Text fontSize={{ md: '14', sm: '12' }}>{favoritesCount}</Text>
          </Button>
          {user?.username === author && (
              <Flex w='100%' justifyContent='space-between' mt='2'>
                <BsListCheck size='24'/>
                <Link href={`/update-${slug}`}>
                  <BsFillPencilFill size='22'/>
                </Link>
              </Flex>
          )}
        </Flex>
      </Flex>
  );
}
