import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { Box, Button, Flex, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Header } from './Header';
import { BodyField } from './BodyField';
import { DeleteButton } from './DeleteButton';
import { articlesService } from 'services/articlesService';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SerializedError } from '@reduxjs/toolkit';
import { useToastHook } from './useToast';

type INewArticleData = FieldValues & {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
}).required();

export function Form() {
  const toast = useToast();
  const router = useRouter();
  const { index: params } = router.query;
  const slug = params as string;
  const { data: articleData } = articlesService.useGetCurrentArticleQuery(slug);
  const articles = articlesService.useGetAllArticlesQuery('');
  const [addNewArticle, { isError: addArticleError }] = articlesService.useAddNewArticleMutation();
  const [updateArticle, {data, isError: updateError }] = articlesService.useUpdateArticleMutation();
  const [state, newToast] = useToastHook();
  // console.log('data', data);
  // console.log('error', updateError);

  // useEffect(()=>{
  //   if (updateError ==false && !data) {
  //     toast({
  //       title: '404',
  //       status: 'error',
  //       duration: 4000,
  //       isClosable: true,
  //     })
  //   } else if ( updateError && data ) {
  //     toast({
  //       title: 'Success',
  //       status: 'success',
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   }
  // },[data, updateError, toast])

  const onSubmitButtonHandler = async (data: INewArticleData) => {
    console.log(1);
    if (slug) {
     const a =  await updateArticle({ slug, ...data }).unwrap();
      console.log(2);
      console.log(a);
      a ?  toast({
        title: 'Success',
        status: 'success',
        duration: 4000,
        isClosable: true,
      }) : toast({
        title: '404',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    } else {
      await addNewArticle(data);
    }
    console.log(3);
     toast({
        title: '404',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });


    articles.refetch();
  };

  const { register, control, handleSubmit, reset, formState: { errors }, } = useForm<INewArticleData>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      title: slug && articleData?.article.title,
      description: slug && articleData?.article.description,
      body: slug && articleData?.article.body,
      tagList: slug ? articleData?.article.tagList : [],
    },
  });

  const submit = (data: INewArticleData) => onSubmitButtonHandler(data);
  const { fields, append, remove } = useFieldArray<INewArticleData>({
    control,
    name: 'tagList',
  });

  const addFieldButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    append('');
  };

  const onDeleteButtonHandler = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    remove(index);
  };

  return (
      <form onSubmit={handleSubmit(submit)}>
        <Flex direction='column' justifyContent='center' alignItems='center'>
          <Header/>
          <Flex direction='column' pos='relative' w={{ lg: '60%', sm: '80%' }} mt='6'>
            <Flex w='100%' direction='column' justifyContent='center' alignItems='center'>
              <FormLabel htmlFor='title' fontWeight='bold'>Title:</FormLabel>
              <Input
                  placeholder='Title...'
                  {...register('title')}
                  _placeholder={{ color: 'gray.400' }}
                  border='none'
                  _focus={{ border: 'none' }}
              />
              <Text fontSize='14px' color='red'>
                {errors.title && errors.title.message}
              </Text>
            </Flex>

            <Flex w='100%' direction='column' justifyContent='center' alignItems='center'>
              <FormLabel htmlFor='description' fontWeight='bold'>Description:</FormLabel>
              <Input
                  placeholder='Description...'
                  {...register('description')}
                  _placeholder={{ color: 'gray.400' }}
                  border='none'
                  _focus={{ border: 'none' }}
              />
              <Text fontSize='14px' color='red'>
                {errors?.description?.message ?? null}
              </Text>
            </Flex>

            <BodyField
                {...register('body')}
                reset={() => reset({ body: '' })}
                errors={errors?.body?.message ?? null}
            />

            {fields.map((field, index) => (
                <Box key={field.id} mt='2'>
                  <Flex w='100' direction='column' justifyContent='center' alignItems='center'>
                    <FormLabel htmlFor='tag' fontWeight='bold'>Tags:</FormLabel>
                    <Input
                        placeholder='Tag'
                        {...register(`tagList.${index}`)}
                        _placeholder={{ color: 'gray.400' }}
                    />
                  </Flex>
                  <Button pos='absolute' bottom='7' right='-22'
                          onClick={(e) => onDeleteButtonHandler(e, index)}
                  >
                    Delete
                  </Button>
                </Box>
            ))}
            <Flex justifyContent='center' w='100%'>
              <Button w='24' mt='5' onClick={addFieldButtonHandler}>
                Add Tag
              </Button>
            </Flex>
          </Flex>
          <Button type='submit' mt='5' bgColor='green.300' color='white' py='2' px='4' fontWeight='semibold'
                  _hover={{ bgColor: 'green.200' }}>
            {slug ? 'Update' : 'Submit'}
          </Button>
          {slug && <DeleteButton/>}
        </Flex>
      </form>
  );
}
