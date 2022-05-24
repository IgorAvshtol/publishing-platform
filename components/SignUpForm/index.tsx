import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex, Text,
} from '@chakra-ui/react';
import { mutate } from 'swr';

import { platformService } from 'services/platformService';
import { closeModal } from 'store/auth/authSlice';
import { useAppDispatch } from 'store/store';
import { setUserFromLocalStorage } from 'services/localStorage';

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
}


export function SignUpForm() {
  const dispatch = useAppDispatch();
  const [registration, { isLoading, error }] = platformService.useRegistrationMutation();
  const fetchArticles = platformService.useGetAllArticlesQuery('');
  const errorMessage = error as string;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignUpData>({ defaultValues: { name: '', email: '', password: '' } });
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
          <FormControl isRequired>
            <Flex direction='column' justifyContent='center' alignItems='center'>
              <FormLabel htmlFor='name'>Name</FormLabel>
              <Input
                  type='name'
                  id='name'
                  placeholder='name'
                  {...register('name', {
                    required: 'This is required',
                  })}
                  _placeholder={{ color: 'gray.400' }}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </Flex>
          </FormControl>

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
