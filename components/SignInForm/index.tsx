import { useForm } from 'react-hook-form';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { mutate } from 'swr';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { articlesService } from 'services/articlesService';
import { setUserFromLocalStorage } from 'services/localStorage';
import { useAppDispatch } from 'store/store';
import { closeModal } from 'store/auth/authSlice';
import { authService } from 'services/authService';

export interface ISignInData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().min(8, 'Password must contain at least 8 characters.').required(),
}).required();


export function SignInForm() {
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = authService.useLoginMutation();
  const fetchArticles = articlesService.useGetAllArticlesQuery('');
  const errorMessage = error as string;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignInData>({ resolver: yupResolver(schema), defaultValues: { email: '', password: '' } });
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
          <Flex w='100%' direction='column' justifyContent='center' alignItems='center'>
            <label htmlFor='email'>Email</label>
            <Input
                type='email'
                id='email'
                placeholder='email'
                {...register('email')}
                _placeholder={{ color: 'gray.400' }}
            />
            <Text fontSize='14px' color='red'>
              {errors.email && errors.email.message}
            </Text>
          </Flex>
          <Flex w='100%' direction='column' justifyContent='center' alignItems='center' mt='2'>
            <label htmlFor='password'>Password</label>
            <Input
                type='password'
                id='password'
                placeholder='password'
                {...register('password')}
                _placeholder={{ color: 'gray.400' }}
            />
            <Text fontSize='14px' color='red'>
              {errors.password && errors.password.message}
            </Text>
          </Flex>
          <Text color='red'>{errorMessage}</Text>
          <Button mt={2} colorScheme='teal' isLoading={isLoading} type='submit'>
            Submit
          </Button>
        </Flex>
      </form>
  );
}
