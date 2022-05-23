import Link from 'next/link';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

import { tagStyles } from 'styles/tag';
import { useAppSelector } from 'store/store';

interface ITags {
  tag: string;
}

export function Tag({ tag }: ITags) {
  const { user } = useAppSelector(state => state.auth);

  return (
      <Box mt='1' mr='2' mb='1'>
        <Link href='/'>
          <Text sx={user ? tagStyles.forAuth : tagStyles.forNotAuth}>
            {tag}
          </Text>
        </Link>
      </Box>
  );
}
