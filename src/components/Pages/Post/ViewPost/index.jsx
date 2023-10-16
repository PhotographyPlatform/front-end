import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostData } from '../../../../store/reducers/basicActions/post';

// Import your custom components
import ViewPostHeader from './ViewPostHeader';
import ViewPostParentDetails from './ViewPostParentDetails ';

import './viewPost.scss'

function ViewPost({ onCloseViewPost, isOpenViewPost, id }) {
    const dispatch = useDispatch();
    const numEffect = useSelector((state) => state.post.numEffect);
    console.log("view post from notification ssss ", id.id)
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchPostData(id));
            } catch (error) {
                // Handle the error here
            }
        };
        fetchData();
    }, [numEffect]);

    const currentPost = useSelector((state) => state.post);
    console.log(currentPost, "CCCCCCCCCCCCCCCUUUUUUUUUUIIIIIIIIIIIIIII")
    return (
        <>
            <Modal onClose={onCloseViewPost} isOpen={isOpenViewPost}  >
                <ModalOverlay />
                <div className='div-handler'>
                    <ModalContent className='model-parent-viewpost' size='full' >
                        <ModalHeader className='viewpost-no-space'>
                            {/* Use the ViewPostHeader component */}
                            <ViewPostHeader />
                            <ModalCloseButton />
                        </ModalHeader>

                        <div className='viewpost-no-space viewpost-child'>
                            {/* Use the ViewPostParent component */}

                            <ViewPostParentDetails post={currentPost} onClose={onCloseViewPost} />
                        </div>
                        {/* <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter> */}
                    </ModalContent>
                </div>
            </Modal>

        </>
    );
}

export default ViewPost;
