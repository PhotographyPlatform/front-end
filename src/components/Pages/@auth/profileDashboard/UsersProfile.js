import { Avatar, Box, Button, Container, Divider, HStack, Image, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Follow, getFollowing, getProfile, unFollow } from '../../../../store/reducers/profile/profile.reducer';
import cookies from 'react-cookies';
import OthersModal from './OthersModal';
import { useNavigate } from 'react-router';
import { AiFillMessage } from 'react-icons/ai';
import placeholder from '../../../assets/cover-1.png'
function UsersProfile() {
    const [data, setData] = useState({});
    const navigate = useNavigate()
    const [showFollowersModal, setShowFollowersModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [toggle, setToggle] = useState(false)
    const profile = useSelector((state) => state.profile.userProfile);
    const userFollowing = useSelector((state) => state.profile.following);
    const dispatch = useDispatch();
    const userId = parseInt(cookies.load('id'));
    const [refresh, setRefresh] = useState(false)
    const handleFollow = async () => {
        try {
            if (toggle === false) {
                dispatch(Follow(userId));
                setToggle(true);
                setRefresh(true)
            } else {
                dispatch(unFollow(userId));
                setToggle(false);
                setRefresh(true)
            }
            dispatch(getProfile(userId));
        } catch (e) {
            console.log(e);
        }
    }

    const handleFollowersClick = () => {
        setShowFollowersModal(!showFollowersModal);
    };

    const handleFollowingClick = () => {
        setShowFollowingModal(!showFollowingModal)
    }

    useEffect(() => {
        if (userId) {
            dispatch(getProfile(userId));
            dispatch(getFollowing())
        }
    }, [refresh])

    // this to get the userprofile and set the data in setState to render the data in the page 
    useEffect(() => {
        if (profile) {
            const user = profile.getUser;
            const followers = profile.followers;
            const following = profile.following;
            setData({ user, followers, following });
            setRefresh(false)
        }
    }, [profile]);


    // this to get the users that following u to compare them with the user that u visit its profile if found then unfollow else follow
    useEffect(() => {
        if (userFollowing !== undefined) {
            const found = userFollowing.Following.find(ele => ele.id === userId);
            if (found) {
                setToggle(true);
            } else {
                setToggle(false);
            }
        }
    }, [userFollowing]);


    return (
        <div style={{ backgroundColor: '#F9F7F7' }}>
            {data.user && (
                <Stack
                    as={Box}
                    spacing={{ base: 8, md: 16 }}
                >
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}
                    >
                        <Image
                            src={data.user.heroImg || placeholder}
                            objectFit="cover"
                            maxW={['100%', '100%', '100%', '100%', '100%']}
                            width={['100%', '100%', '100%', '1000px', '1260px']}
                            height="350px"
                        />
                        <Avatar
                            position="absolute"
                            top={['83%', '85%', '85%', '85%']}
                            size={['xl', 'xl', '2xl']}
                            src={data.user.img}
                        />
                    </Stack>
                    <Stack>
                        <Box key={data.user.id} marginTop='1%'>
                            <Text fontSize="3xl" marginBottom='0'>{data.user.username}</Text>
                            <Text fontSize="2xl">{data.user.address}</Text>
                            <Box justifyContent='center' gap='10px' display='flex'>
                                {
                                    toggle ?
                                        <Button onClick={handleFollow} className='btn-hover' style={{
                                            transition: 'background-color 0.3s ease',
                                            backgroundColor: 'white',
                                            color: '#3F72AF',
                                            borderColor: '#3F72AF',
                                            borderWidth: '1px',
                                            borderStyle: 'solid',
                                        }}>
                                            Following
                                        </Button> :
                                        <Button onClick={handleFollow} className='btn-hover2' style={{
                                            transition: 'background-color 0.3s ease',
                                            backgroundColor: '#3F72AF',
                                            color: '#F9F7F7',
                                            borderColor: '#112D4E',
                                            borderWidth: '1px',
                                            borderStyle: 'solid',
                                        }}>
                                            Follow
                                        </Button>
                                }
                                <Button className='btn-hover2' style={{
                                    transition: 'background-color 0.3s ease',
                                    backgroundColor: '#3F72AF',
                                    color: '#F9F7F7',
                                }} onClick={() => { navigate(`/messages/${data.user.id}`) }}><AiFillMessage /></Button>
                            </Box>
                            <HStack justifyContent="center" gap="30px" paddingTop='10px'>
                                <Text fontSize="xl"
                                    fontWeight="bold"
                                    cursor='pointer'
                                    _hover={{ color: 'gray' }}
                                    onClick={handleFollowersClick}
                                >
                                    Followers <Text>{data.followers.Count}</Text>
                                </Text>
                                <Text fontSize="xl"
                                    fontWeight="bold"
                                    cursor='pointer'
                                    _hover={{ color: 'gray' }}
                                    onClick={handleFollowingClick}
                                >
                                    Following <Text>{data.following.Count}</Text>
                                </Text>
                            </HStack>
                        </Box>
                    </Stack>
                    <Divider />

                </Stack>

            )}
            {showFollowersModal && data.followers.Count !== 0 ? <OthersModal followers={data.followers} /> : null}
            {showFollowingModal && data.following.Count !== 0 ? <OthersModal following={data.following} /> : null}
        </div>
    );
}

export default UsersProfile