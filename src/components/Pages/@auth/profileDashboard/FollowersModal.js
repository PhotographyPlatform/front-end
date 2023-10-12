import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, OrderedList, Text, UnorderedList, useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, unFollow, removeFollower } from '../../../../store/reducers/profile/profile.reducer'
import { useNavigate } from 'react-router-dom'
import UsersProfile from './UsersProfile'
import cookies from 'react-cookies'
import { setTrue } from '../../../../store/reducers/profile/refresh'

function FollowersModal({ followers, following }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const profileState = useSelector(state => state.profile)
    const [show, setShow] = useState(false)
    const [userId, setID] = useState(null)
    const refreshState = useSelector(state => state.refresh)
    console.log(refreshState);
    const handleID = id => {
        cookies.remove('id')
        cookies.save('id', id)
        setID(id)
        setShow(!show)
    }

    const handleRemove = (id) => {
        try {
            if (id) {
                dispatch(removeFollower(id))
                dispatch(setTrue())
                onClose()
            }
        } catch (e) {
            console.log(e);
        }
    }
    const handleUnFollow = (id) => {
        try {
            if (id) {
                dispatch(unFollow(id))
                dispatch(setTrue())
                onClose()
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (userId) {
            dispatch(getProfile(userId))
            navigate('/userProfile')
        }
    }, [show])

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
                            <UnorderedList display='flex' justifyContent='space-between' flexDirection='column'>
                                {
                                    profileState.followers.followers.map(follow => (
                                        <Box display='flex' justifyContent='space-between' paddingBottom='15px'>

                                            <Box key={follow.id} onClick={() => handleID(follow.id)} display="flex"
                                                alignItems="center" cursor='pointer'
                                                _hover={{ color: 'gray' }}
                                                justifyContent='space-between'>
                                                <Avatar size='md' />
                                                <Text ml="5">{follow.name}</Text>
                                            </Box>
                                            <Button onClick={() => handleRemove(follow.id)} backgroundColor='blue'
                                                color='white'
                                                size='sm'
                                            >
                                                remove Follower
                                            </Button>
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
                            <UnorderedList>
                                {
                                    profileState.following.Following.map(follow => (
                                        <Box display='flex' justifyContent='space-between'>
                                            <Box key={follow.id} onClick={() => handleID(follow.id)} display="flex"
                                                alignItems="center" cursor='pointer'
                                                _hover={{ color: 'gray' }}
                                                justifyContent='space-between'>
                                                <Avatar size='md' />
                                                <Text ml="5">{follow.name}</Text>
                                            </Box>
                                            <Button onClick={() => handleUnFollow(follow.id)} backgroundColor='red'
                                                color='white'
                                                size='md'
                                            >
                                                unFollow
                                            </Button>
                                        </Box>
                                    ))
                                }

                            </UnorderedList>
                        </ModalBody>
                    </ModalContent>
                </Modal >
            }
            {show && <UsersProfile />}
        </>)
}

export default FollowersModal
