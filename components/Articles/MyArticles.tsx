import { Flex, Text } from '@chakra-ui/react';

import { useAppSelector } from 'store/store';
import { Article } from './Article';
import { platformService } from 'services/platformService';


export function MyArticles() {
  const { user } = useAppSelector((state) => state.auth);
  const { data } = platformService.useGetCurrentUserArticlesQuery(`${user?.username}`);

  return (
      <Flex w='100%' direction='column' alignItems='center'>
        {data?.articles.length === 0 && (
            <Text fontSize='14' mt='12'>You don&apos;t have any posts yet.</Text>
        )}
        {data?.articles.map((post) => (
            <Article
                key={post.slug}
                title={post.title}
                avatar={post.author.image}
                description={post.description}
                author={post.author.username}
                createdAt={post.createdAt}
                tagList={post.tagList}
                slug={post.slug}
                favorited={post.favorited}
                favoritesCount={post.favoritesCount}
            />
        ))}
      </Flex>
  );
}
