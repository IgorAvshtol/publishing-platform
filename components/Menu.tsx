import { Divider, Menu, MenuButton, MenuItem, MenuList, } from '@chakra-ui/react';
import Router from 'next/router';

import { ResponseImage } from './ResponseImage';
import { useAppDispatch } from 'store/store';
import avatar from 'public/images/avatar.png';
import { logout } from 'store/auth/authSlice';
import { articlesService } from 'services/articlesService';


export function DropDownMenu() {
  const dispatch = useAppDispatch();
  const fetchArticles = articlesService.useGetAllArticlesQuery('');

  const onLogoutClickHandler = async () => {
    dispatch(logout());
    fetchArticles.refetch();
    await Router.push('/')
  };

  return (
      <Menu isLazy>
        <MenuButton display='flex' justifyContent='center'>
          <ResponseImage src={avatar} w='9' alt='avatar'/>
        </MenuButton>
        <MenuList bgColor='white' minW='0' w='100px'>
          <MenuItem _hover={{ textDecoration: 'underline' }}>Settings</MenuItem>
          <Divider mx='auto' w='90%' bgColor='gray.300'/>
          <MenuItem _hover={{ textDecoration: 'underline' }} onClick={onLogoutClickHandler}>Logout</MenuItem>
        </MenuList>
      </Menu>
  );
}
