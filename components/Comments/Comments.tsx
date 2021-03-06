import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

import { InputBlock } from './InputBlock';
import { Comment } from './Comment';
import { commentsService } from 'services/commentsService';

interface IComments {
  isOpen: boolean;
  onClose: () => void;
}


export function Comments({ isOpen, onClose }: IComments) {
  const router = useRouter();
  const { index } = router.query;
  const slug = index as string;

  const data = commentsService.useGetAllCommentsQuery(slug);
  const { data: fetchComments } = data;
  const [createComment] = commentsService.useCreateCommentMutation();
  const [commentText, setCommentText] = useState<string>('');

  const onChangeInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.currentTarget.value);
  };

  const onClickSendButton = async () => {
    await createComment({ slug, comment: commentText });
    data.refetch();
    setCommentText('');
  };

  return (
      <>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size='sm'
        >
          <DrawerOverlay/>
          <DrawerContent bgColor='white' rounded='20px'>
            <DrawerCloseButton/>
            <DrawerHeader>Comments({fetchComments?.comments.length}):</DrawerHeader>
            <DrawerBody>
              <Flex justifyContent='center'>
                <InputBlock onChangeInputHandler={onChangeInputHandler} onClickSendButton={onClickSendButton} commentText={commentText}/>
              </Flex>
              {
                fetchComments?.comments.map(comment => <Comment key={comment.id} createdAt={comment.createdAt} body={comment.body} author={comment.author} id={comment.id}/>)
              }
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
  );
}
