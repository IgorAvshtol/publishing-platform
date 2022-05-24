import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import Link from 'next/link';
import { Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { BsListCheck, BsSuitHeartFill } from 'react-icons/bs';

import { Topic } from '../Topic';
import { ResponseImage } from '../ResponseImage';
import lens from 'public/images/lens.webp';
import { platformService } from 'services/platformService';

export interface IPost {
  avatar: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
  tagList: string[];
}


export function Article(props: IPost) {
  const { author, avatar, description, title, createdAt, tagList, favoritesCount, slug, favorited, } = props;

  const [like] = platformService.useLikeMutation();
  const [dislike] = platformService.useDislikeMutation();

  const correctDate = format(new Date(createdAt), 'MMMd');

  const onLikeButtonClickHandler = async () => {
    if (!favorited) {
      await like(slug);
    } else {
      await dislike(slug);
    }
  };


  return (
      <Flex w='100%' py='6' justifyContent='space-between' borderBottom='1px' borderColor='gray.300'>
        <Flex w='67%' direction='column' justifyContent='space-between'>
          <Flex justifyContent='space-between' w={{ md: '100%', sm: '44' }}>
            <Link href={`/profile/@${author}`}>
              <Flex w='24' alignItems='center'>
                <Avatar src={avatar} w={'25px'} h={'25px'}/>
                <Text ml='2'>{author}</Text>
              </Flex>
            </Link>
            <Button p='0' onClick={onLikeButtonClickHandler}>
              <Flex w='65px' h='25px' justifyContent='space-between' alignItems='center' px='1' bgColor='green.100' borderRightRadius='35px' borderLeftRadius='35px'>
                <BsSuitHeartFill size='14' color={favorited ? 'red' : 'black'}/>
                <Text className='text-xs xl:text-base lg:text-base md:text-base sm:text-base' fontSize={{ md: '14px', sm: '12px' }}>
                  {favoritesCount}
                </Text>
              </Flex>
            </Button>
          </Flex>
          <Link href={`/articles/${slug}`}>
            <Heading as='h2' pt='2' fontWeight='bold' fontSize={{ md: '20px', sm: '16px' }} cursor='pointer'>
              {title}
            </Heading>
          </Link>
          <Box display={{ md: 'block', sm: 'none' }}>
            <Heading as='h3' noOfLines={2} pt='2' fontWeight='normal' fontSize={{ md: '16px', sm: '14px' }} textColor='gray.400'>
              {description}
            </Heading>
          </Box>
          <Flex pt='2' justifyContent='space-between' alignItems='start' fontSize='12px' textColor='gray.400'>
            <Flex>
              <Text>{correctDate}</Text>
              {tagList.length > 0 && (
                  <>
                    <Text mx='1'>·</Text>
                    <Flex wrap='wrap'>
                      {tagList.map((tag) => (
                          <Topic key={nanoid()} topic={tag}/>
                      ))}
                    </Flex>
                  </>
              )}
            </Flex>
            <Link href='/'>
              <BsListCheck size='24'/>
            </Link>
          </Flex>
        </Flex>
        <Link href='/'>
          <ResponseImage src={lens} alt='post-cover' w={{ lg: '44', md: '40', sm: '24' }} layout='responsive'/>
        </Link>
      </Flex>
  );
}
