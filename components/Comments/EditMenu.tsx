import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { commentsService } from 'services/commentsService';

interface IEditMenu {
  id: number,
}


export function EditMenu({ id }: IEditMenu) {
  const router = useRouter();
  const { index } = router.query;
  const slug = index as string;
  const data = commentsService.useGetAllCommentsQuery(slug);
  const [deleteComment] = commentsService.useDeleteCommentMutation();

  const onDeleteButtonHandler = async () => {
    await deleteComment({ slug, id });
    data.refetch();
  };

  return (
      <Menu>
        <MenuButton as={Button}>
          ···
        </MenuButton>
        <MenuList bgColor='white' minW='0' w={'20'}>
          <MenuItem>Edit</MenuItem>
          <MenuItem onClick={onDeleteButtonHandler}>Delete</MenuItem>
        </MenuList>
      </Menu>
  );
}
