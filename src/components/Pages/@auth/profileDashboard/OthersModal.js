import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    UnorderedList,
    useDisclosure
}
    from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../../../store/reducers/profile/profile.reducer'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import cookies from 'react-cookies'

function OthersModal({ followers, following }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const token = cookies.load('user_session')
    const parseToken = decodeToken(token)

    const handleID = (id) => {
        cookies.remove('id');
        cookies.save('id', id);
        if (id !== parseToken.userId) {
            dispatch(getProfile(id));
            navigate('/userProfile');
        } else {
            navigate('/profile')
        }
    };

    useEffect(() => {
        onOpen()
    }, [])

    return (
        <>
            {
                followers &&
                < Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Followers</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <UnorderedList display='flex' justifyContent='space-between' flexDirection='column' gap='12px'>
                                {
                                    followers.followers.map(follow => (

                                        <Box key={follow.id} onClick={() => handleID(follow.id)} display="flex" alignItems="center" cursor='pointer' _hover={{ color: 'gray' }}>
                                            <Avatar size='md' src={follow.img} />
                                            <Text ml="5">{follow.name}</Text>
                                        </Box>
                                    ))
                                }
                            </UnorderedList>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal >
            }
            {
                following &&
                < Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Following</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <UnorderedList display='flex' justifyContent='space-between' flexDirection='column' gap='12px'>
                                {
                                    following.Following.map(follow => (
                                        <Box key={follow.id} onClick={() => handleID(follow.id)} display="flex" alignItems="center" cursor='pointer' _hover={{ color: 'gray' }} >
                                            <Avatar size='md' src={follow.img} />
                                            <Text ml="5" >{follow.name}</Text>
                                        </Box>
                                    ))
                                }
                            </UnorderedList>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal >
            }
        </>)
}

export default OthersModal
