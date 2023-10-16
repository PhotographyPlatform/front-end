import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stories from 'react-insta-stories';
import { getOtherStories } from '../../../../store/reducers/stories/stories.reducer'
import { Avatar, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
function Otherstories({ id, setSelectedStoryId }) {
    const dispatch = useDispatch()
    const story = useSelector(state => state.stories.otherStories)
    const data = useSelector(state => state.stories)
    const [images, setImages] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        onOpen()
        dispatch(getOtherStories(id))
    }, [])


    useEffect(() => {
        if (story) {
            const storyImages = story.stories.map(story => {
                const createdAtDate = new Date(story.createdAt);
                const currentTime = new Date();
                const timeDifferenceMs = currentTime - createdAtDate;
                const minutesAgo = Math.floor(timeDifferenceMs / (1000 * 60));
                if (minutesAgo >= 60) {
                    const hoursAgo = Math.floor(minutesAgo / 60);
                    return {
                        url: story.storyUrl,
                        header: {
                            heading: `${data.otherStories.firstName} ${data.otherStories.lastName}`,
                            subheading: `Posted ${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`,
                            profileImage: data.otherStories.img,
                        },

                    };
                } else {
                    return {
                        url: story.storyUrl,
                        header: {
                            heading: `${data.otherStories.firstName} ${data.otherStories.lastName}`,
                            subheading: minutesAgo === 0 ? 'just now' : `Posted ${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`,
                            profileImage: data.otherStories.img,
                        },
                    };
                }
            });
            setImages(storyImages);
        }
    }, [story]);

    const close = () => {
        setSelectedStoryId(null)
        onClose()
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={close}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            images.length ?
                                < Stories
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
    )
}

export default Otherstories




// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getOtherStories } from '../../../../store/reducers/stories/stories.reducer'
// function Otherstories({ id }) {
//     const dispatch = useDispatch()
//     const story = useSelector(state => state.stories.otherStories)
//     console.log(story);
//     useEffect(() => {
//         dispatch(getOtherStories(id.id))
//     }, [])
//     return (
//         // <Modal isOpen={isOpen} onClose={onClose}>
//         //     <ModalOverlay />
//         //     <ModalContent>
//         //         <ModalHeader></ModalHeader>
//         //         <ModalCloseButton />
//         //         <ModalBody>
//         //             {
//         //                 images ?
//         //                     < Stories
//         //                         stories={images}
//         //                         defaultInterval={5000}
//         //                         loop={true}
//         //                         width={400}
//         //                         height={600}
//         //                     />
//         //                     :
//         //                     <Text>No story</Text>
//         //             }
//         //         </ModalBody>
//         //     </ModalContent>
//         // </Modal>
//         <>
//         </>
//     )
// }

// export default Otherstories
