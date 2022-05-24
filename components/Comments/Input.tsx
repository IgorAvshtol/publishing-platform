import { Textarea, TextareaProps } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import { ChangeEvent, forwardRef } from 'react';

interface IInput extends TextareaProps {
  commentText: string;
  onChangeInputHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}


export const Input = forwardRef<HTMLTextAreaElement,
    IInput>((props, ref) => {
  const { commentText, onChangeInputHandler } = props;

  return (
      <Textarea
          value={commentText}
          onChange={onChangeInputHandler}
          placeholder='What are your thoughts?'
          _placeholder={{ color: 'gray.500' }}
          minH='unset'
          overflow='hidden'
          w='100%'
          resize='none'
          ref={ref}
          minRows={1}
          as={ResizeTextarea}
          border='none'
          _focus={{ border: 'none' }}
          {...props}
      />
  );
});

Input.displayName = 'Input';
