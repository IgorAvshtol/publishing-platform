import { Box, Flex, FormLabel, Textarea, TextareaProps, Text } from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import ResizeTextarea from 'react-textarea-autosize';

import { BsArrowCounterclockwise } from 'react-icons/bs';

interface BodyFieldProps extends TextareaProps {
  name: string;
  reset: () => void;
  errors: string | null;
}


export const BodyField = forwardRef<HTMLTextAreaElement, BodyFieldProps>((props, ref) => {
  const { name, errors, reset, ...inputProps } = props;
  const onResetButtonHandler = () => {
    reset();
  };

  return (
      <Flex direction='column' justifyContent='center' alignItems='center'>
        <FormLabel htmlFor='body' fontWeight='bold'>Body:</FormLabel>
        <Textarea
            name={name}
            placeholder='Body'
            _placeholder={{ color: 'gray.400' }}
            w='100%'
            resize='none'
            ref={ref}
            minRows={1}
            as={ResizeTextarea}
            border='none'
            _focus={{ border: 'none' }}
            mt='2'
            p='4'
            h='56'
            {...inputProps}
        />
        <Box pos='absolute' bottom='0' right='4'>
          <BsArrowCounterclockwise width='8' onClick={onResetButtonHandler}/>
        </Box>
        {errors && <Text fontSize='14px' color='red'>{errors}</Text>}
      </Flex>
  );
});

BodyField.displayName = 'BodyField';
