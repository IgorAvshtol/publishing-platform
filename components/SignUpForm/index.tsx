import { useForm } from 'react-hook-form';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { mutate } from 'swr';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { articlesService } from 'services/articlesService';
import { closeModal } from 'store/auth/authSlice';
import { useAppDispatch } from 'store/store';
import { setUserFromLocalStorage } from 'services/localStorage';
import { authService } from 'services/authService';

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().min(8, 'Password must contain at least 8 characters.').required(),
}).required();


export function SignUpForm() {
  const dispatch = useAppDispatch();
  const [registration, { isLoading, error }] = authService.useRegistrationMutation();
  const fetchArticles = articlesService.useGetAllArticlesQuery('');
  const errorMessage = error as string;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignUpData>({ resolver: yupResolver(schema), defaultValues: { name: '', email: '', password: '' } });
  const onSubmit = (data: ISignUpData) => onSubmitHandler(data);

  const onSubmitHandler = async (data: ISignUpData) => {
    const response = await registration(data).unwrap();
    await setUserFromLocalStorage(response);
    await mutate('userData', response);
    fetchArticles.refetch();
    dispatch(closeModal());
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction='column' justifyContent='space-between' alignItems='center'>
          <Flex w='100%' direction='column' justifyContent='center' alignItems='center'>
            <label htmlFor='name'>Name</label>
            <Input
                type='name'
                id='name'
                placeholder='name'
                {...register('name')}
                _placeholder={{ color: 'gray.400' }}
            />
            <Text fontSize='14px' color='red'>
              {errors.name && errors.name.message}
            </Text>
          </Flex>
          <Flex direction='column' justifyContent='center' alignItems='center'>
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
          <Flex direction='column' justifyContent='center' alignItems='center' mt='2'>
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
