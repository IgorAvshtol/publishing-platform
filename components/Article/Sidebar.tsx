import { Avatar, Button, Divider, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Links } from 'components/Links';
import { useAppSelector } from 'store/store';
import { articlesService } from 'services/articlesService';


export function Sidebar() {
  const router = useRouter();
  const { index } = router.query;
  const { data } = articlesService.useGetCurrentArticleQuery(index as string);
  const { user } = useAppSelector((state) => state.auth);
  const author = data?.article.author.username;
  const currentUserName = user?.username;

  return (
      <Flex pos='sticky' top='24' ml='4' direction='column' w={{ xl: '100%', lg: '85' }} className='sticky top-24 ml-4 flex-col xl:w-full lg:w-4/5'>
        <Avatar src={data?.article.author.image} size='lg'/>
        <Text pt='2' fontWeight='bold' fontSize='16'>{author}</Text>
        {currentUserName !== author && (
            <Flex pt='1' w='100%' className='pt-1 w-full flex'>
              <Button w='20' h='8' textColor='white' fontSize='14px' fontWeight='normal' mt='2' mb='2' colorScheme='green'>{data?.article.author.following ? 'Unfollow' : 'Follow'}</Button>
            </Flex>
        )}
        <Divider my='2' w='83%' bgColor='gray.300'/>
        <Flex w='100%' wrap='wrap'>
          <Links/>
        </Flex>
      </Flex>
  );
}
