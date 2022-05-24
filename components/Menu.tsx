import { Divider, Menu, MenuButton, MenuItem, MenuList, } from '@chakra-ui/react';

import { ResponseImage } from './ResponseImage';
import { useAppDispatch } from 'store/store';
import avatar from 'public/images/avatar.png';
import { logout } from 'store/auth/authSlice';
import { platformService } from 'services/platformService';


export function DropDownMenu() {
  const dispatch = useAppDispatch();
  const fetchArticles = platformService.useGetAllArticlesQuery('');

  const onLogoutClickHandler = () => {
    dispatch(logout());
    fetchArticles.refetch();
  };

  return (
      <Menu isLazy>
        <MenuButton display='flex' justifyContent='center'>
          <ResponseImage src={avatar} w='9' alt='avatar'/>
        </MenuButton>
        <MenuList bgColor='white'>
          <MenuItem _hover={{ textDecoration: 'underline' }}>Settings</MenuItem>
          <Divider mx='auto' w='90%' bgColor='gray.300'/>
          <MenuItem _hover={{ textDecoration: 'underline' }} onClick={onLogoutClickHandler}>Logout</MenuItem>
        </MenuList>
      </Menu>
  );
}
