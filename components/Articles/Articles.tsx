import { Flex, Spinner } from '@chakra-ui/react';

import { Article } from './Article';
import notFound from '/public/images/404-not-found.png';
import { ResponseImage } from '../ResponseImage';
import { useAppSelector } from 'store/store';
import { articlesService } from 'services/articlesService';


export function Articles() {
  const { data, isLoading, isError } = articlesService.useGetAllArticlesQuery('');
  const { user } = useAppSelector(state => state.auth);
  const articles = data?.articles;

  return (
      <Flex direction='column' alignItems='center' w={user ? '100%' : { xl: '67%', lg: '75%' }}>
        {isError && (
            <Flex w='100%' h='100%' justifyContent='center' alignItems='center'>
              <ResponseImage src={notFound} alt='404-not-found' w='100' h='100'/>
            </Flex>
        )}
        {isLoading && <Spinner w={15}/>}
        {!isLoading &&
            articles?.map((post) => (
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
