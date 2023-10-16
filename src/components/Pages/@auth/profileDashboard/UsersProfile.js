import { Avatar, Box, Button, Container, Divider, HStack, Image, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Follow, getFollowing, getProfile, unFollow } from '../../../../store/reducers/profile/profile.reducer';
import cookies from 'react-cookies';
import OthersModal from './OthersModal';

function UsersProfile() {
    const [data, setData] = useState({});
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
        <Container maxW="2xl">
            {data.user && (
                <Stack
                    as={Box}
                    spacing={{ base: 8, md: 16 }}
                    py={{ base: 1, md: 3 }}
                >
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}
                    >
                        <Image
                            src={data.user.heroImg}
                            objectFit="cover"
                            maxW={{ base: '700px', md: '715px', lg: '1200px', xl: '1260px' }}
                            width={{ base: '700px', md: '715px', lg: '950px', xl: '1035px' }}
                            height="300px"
                        />
                        <Avatar
                            position="absolute"
                            top={{ base: '88%', sm: '90%', md: '93%', lg: '90%' }}
                            size={{ base: 'md', sm: 'lg', md: 'xl' }}
                            src={data.user.img}
                        />
                    </Stack>
                    <Stack>
                        <div key={data.user.id}>
                            <Text fontSize="3xl">{data.user.username}</Text>
                            <Text fontSize="2xl">{data.user.address}</Text>
                            {
                                toggle ?
                                    <Button onClick={handleFollow} style={{ transition: 'background-color 0.3s ease' }}>
                                        unFollow
                                    </Button> :
                                    <Button onClick={handleFollow}>
                                        Follow
                                    </Button>
                            }
                            <HStack justifyContent="center" gap="30px">
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
                        </div>
                    </Stack>
                    <Divider />
                </Stack>
            )}
            {showFollowersModal && data.followers.Count !== 0 ? <OthersModal followers={data.followers} /> : null}
            {showFollowingModal && data.following.Count !== 0 ? <OthersModal following={data.following} /> : null}
        </Container>
    );
}

export default UsersProfile