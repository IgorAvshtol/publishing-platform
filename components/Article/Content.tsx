import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';

import { Description } from './Description';
import { Header } from './Header';
import { articlesService } from 'services/articlesService';


export function Content() {
  const router = useRouter();
  const { index } = router.query;
  const { data } = articlesService.useGetCurrentArticleQuery(index as string);
  const currentArticle = data?.article;

  return (
      <>
        {currentArticle && (
            <Flex w='75%' mx='auto' direction='column'>
              <Header
                  slug={currentArticle.slug}
                  author={currentArticle.author.username}
                  avatar={currentArticle.author.image}
                  createdAt={currentArticle.createdAt}
                  tagList={currentArticle.tagList}
                  favoritesCount={currentArticle.favoritesCount}
                  favorited={currentArticle.favorited}
              />
              <Description
                  title={currentArticle.title}
                  description={currentArticle.description}
                  body={currentArticle.body}
              />
            </Flex>
        )}
      </>
  );
}
