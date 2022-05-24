import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

import { Input } from './Input';
import { useAppSelector } from 'store/store';

interface IInputBlock {
  commentText: string;
  onChangeInputHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickSendButton: () => void;
}


export function InputBlock({ onChangeInputHandler, onClickSendButton, commentText }: IInputBlock) {
  const { user } = useAppSelector(state => state.auth);

  return (
      <Flex direction='column' w='95%' px='2' py='4' border='1px solid transparent' boxShadow='0 25px 50px -12px rgb(0 0 0 / 0.25)'>
        <Flex alignItems='center'>
          <Avatar src={user?.image}/>
          <Text ml={3}>{user?.username}</Text>
        </Flex>
        <Flex direction='column' justifyContent='space-between' alignItems='end'>
          <Input mt='2' commentText={commentText} onChangeInputHandler={onChangeInputHandler}/>
          <Button w='20' fontWeight='normal' color='white' bgColor='green.200' _hover={{ bgColor: 'green.200' }} onClick={onClickSendButton}>Respond</Button>
        </Flex>
      </Flex>
  );
}
