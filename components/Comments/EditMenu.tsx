import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { platformService } from 'services/platformService';

interface IEditMenu {
  id: number,
}


export function EditMenu({ id }: IEditMenu) {
  const router = useRouter();
  const { index } = router.query;
  const slug = index as string;
  const [deleteComment] = platformService.useDeleteCommentMutation();

  const onDeleteButtonHandler = async () => {
    await deleteComment({ slug, id });
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
