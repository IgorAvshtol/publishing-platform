import { useForm } from 'react-hook-form';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { mutate } from 'swr';

import { platformService } from 'services/platformService';
import { setUserFromLocalStorage } from 'services/localStorage';
import { useAppDispatch } from 'store/store';
import { closeModal } from 'store/auth/authSlice';

export interface ISignInData {
  email: string;
  password: string;
}


export function SignInForm() {
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = platformService.useLoginMutation();
  const fetchArticles = platformService.useGetAllArticlesQuery('');
  const errorMessage = error as string;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignInData>({ defaultValues: { email: '', password: '' } });
  const onSubmit = (data: ISignInData) => onSubmitHandler(data);

  const onSubmitHandler = async (data: ISignInData) => {
    const response = await login(data).unwrap();
    await setUserFromLocalStorage(response);
    await mutate('userData', response);
    fetchArticles.refetch();
    dispatch(closeModal());
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction='column' justifyContent='space-between' alignItems='center'>
          <FormControl isRequired>
            <Flex direction='column' justifyContent='center' alignItems='center'>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                  type='email'
                  id='email'
                  placeholder='email'
                  {...register('email', {
                    required: 'This is required',
                  })}
                  _placeholder={{ color: 'gray.400' }}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </Flex>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.password}>
            <Flex direction='column' justifyContent='center' alignItems='center' mt='2'>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                  type='password'
                  id='password'
                  placeholder='password'
                  {...register('password', {
                    required: 'This is required',
                    minLength: { value: 8, message: 'Minimum length should be 8' },
                  })}
                  _placeholder={{ color: 'gray.400' }}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </Flex>
          </FormControl>
          <Text color='red'>{errorMessage}</Text>
          <Button mt={2} colorScheme='teal' isLoading={isLoading} type='submit'>
            Submit
          </Button>
        </Flex>
      </form>
  );
}
