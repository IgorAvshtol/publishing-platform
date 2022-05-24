import { Button, Divider, Flex } from '@chakra-ui/react';
import { BsChatLeftText } from 'react-icons/bs';

import { ResponseImage } from '../ResponseImage';
import clap from 'public/images/clap.svg';


interface IResponse {
  onOpen: () => void;
}

export function Response({ onOpen }: IResponse) {
  return (
      <Flex w='32' bgColor='white' justifyContent='space-between' px='4' py='1' border='1px solid #CBD5E0' rounded='xl' shadow='2xl'>
        <Button pos='relative' p='0'>
          <ResponseImage src={clap} w={8} alt='notification'/>
        </Button>
        <Divider orientation='vertical' h='100%'/>
        <Button pos='relative' p='0' onClick={onOpen}>
          <BsChatLeftText size='22'/>
        </Button>
      </Flex>
  );
}
