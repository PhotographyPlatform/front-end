import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stories from 'react-insta-stories';
import { getOtherStories } from '../../../../store/reducers/stories/stories.reducer';
import { Avatar, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import cookies from 'react-cookies';
function Otherstories({ id, setSelectedStoryId }) {
    const dispatch = useDispatch();
    const story = useSelector(state => state.stories.otherStories);
    const data = useSelector(state => state.stories);
    const [images, setImages] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onOpen();
        dispatch(getOtherStories(id));
    }, []);

    useEffect(() => {
        async function fetchAndProcessStories() {
            if (story) {
                const storyImages = await Promise.all(story.stories.map(async story => {
                    const createdAtDate = new Date(story.createdAt);
                    const currentTime = new Date();
                    const timeDifferenceMs = currentTime - createdAtDate;
                    const minutesAgo = Math.floor(timeDifferenceMs / (1000 * 60));

                    if (minutesAgo >= 60) {
                        const hoursAgo = Math.floor(minutesAgo / 60);
                        if (hoursAgo >= 24) {
                            try {
                                const token = cookies.load('user_session');
                                const response = await axios.delete(`http://localhost:3002/story/${story.id}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    }
                                });
                                console.log(response.data);
                            } catch (e) {
                                console.log(e.message);
                            }
                        }
                        return {
                            url: story.storyUrl,
                            header: {
                                heading: `${data.otherStories.firstName} ${data.otherStories.lastName}`,
                                subheading: `Posted ${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`,
                                profileImage: data.otherStories.img,
                            }
                        }
                    } else {
                        return {
                            url: story.storyUrl,
                            header: {
                                heading: `${data.otherStories.firstName} ${data.otherStories.lastName}`,
                                subheading: minutesAgo === 0 ? 'just now' : `Posted ${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`,
                                profileImage: data.otherStories.img,
                            }
                        };
                    }
                }));

                setImages(storyImages);
            }
        }

        fetchAndProcessStories();
    }, [story]);

    const close = () => {
        setSelectedStoryId(null);
        onClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={close}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) '
                />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            images.length ?
                                <Stories
                                    stories={images}
                                    defaultInterval={5000}
                                    loop={true}
                                    width={400}
                                    height={600}
                                />
                                :
                                <Text>story unavailable</Text>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Otherstories;
