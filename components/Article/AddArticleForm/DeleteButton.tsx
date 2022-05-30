import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { articlesService } from 'services/articlesService';


export function DeleteButton() {
  const router = useRouter();
  const { index: params } = router.query;
  const slug = params as string;

  const [deleteArticle] = articlesService.useDeleteArticleMutation();
  const data = articlesService.useGetAllArticlesQuery('');

  const onDeleteButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteArticle(slug);
    data.refetch();
  };

  return (
      <Button mt='6' pos='relative' onClick={onDeleteButtonHandler}>
        <BsFillTrashFill size='24'/>
      </Button>
  );
}
