import React, { useEffect, useState } from 'react';
import Stories from 'react-insta-stories';
import Cookies from 'react-cookies'
import { useDispatch, useSelector } from 'react-redux';
import { getStories, uploadImage } from '../../../../store/reducers/stories/stories.reducer';
import { Alert, Button, Container, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { uderData } from '../../../../store/reducers/auth/user.reducer';

export default function Mystory({ MystoryHandler }) {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const stories = useSelector(state => state.stories.myStories);
    const data = useSelector(state => state.user.user);
    const [images, setImages] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()



    useEffect(() => {
        dispatch(getStories());
        onOpen()
    }, []);

    useEffect(() => {
        const userData = Cookies.load('user')
        dispatch(uderData(userData))
    }, [])

    useEffect(() => {
        if (stories) {
            const storyImages = stories.map(story => {
                const createdAtDate = new Date(story.createdAt);
                const currentTime = new Date();
                const timeDifferenceMs = currentTime - createdAtDate;
                const minutesAgo = Math.floor(timeDifferenceMs / (1000 * 60));
                if (minutesAgo >= 60) {
                    const hoursAgo = Math.floor(minutesAgo / 60);
                    return {
                        url: story.storyUrl,
                        header: {
                            heading: `My Story`,
                            // `${data.firstName} ${data.lastName}
                            subheading: `Posted ${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`,
                            profileImage: data.img,
                        },
                    };
                } else {
                    return {
                        url: story.storyUrl,
                        header: {
                            heading: `My Story`,
                            // ${data.firstName} ${data.lastName}
                            subheading: minutesAgo === 0 ? 'just now' : `Posted ${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`,
                            profileImage: data.img,
                        },
                    };
                }
            });
            setImages(storyImages);

        }
    }, [stories, data]);

    const close = () => {
        MystoryHandler(false)
        onClose()
    }

    return (
        <Container display='flex' justifyContent='space-between'>
            <Modal isOpen={isOpen} onClose={close}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            images ?
                                < Stories
                                    stories={images}
                                    defaultInterval={5000}
                                    loop={true}
                                    width={400}
                                    height={600}
                                />
                                :
                                <Text>No story</Text>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
}
