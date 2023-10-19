
import React, { useEffect, useState } from 'react';
import './Home.scss'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Avatar,
    Heading,
    Text,
    IconButton,
    Image,
    Button,
    Box,
    Container,
    Input,
    Divider,
} from '@chakra-ui/react';
import { getOtherStories, uploadImage } from '../../../../store/reducers/stories/stories.reducer';
import { BsFillPencilFill, BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import { homeSocket } from '../../../../App';
import { getFollowing, getImages } from '../../../../store/reducers/profile/profile.reducer';
import { useDispatch, useSelector } from 'react-redux';
import OthersModal from '../profileDashboard/OthersModal';
import Otherstories from '../stories/Otherstories';
import { uderData } from '../../../../store/reducers/auth/user.reducer';
import Cookies from 'react-cookies'
import Mystory from '../stories/Mystory';
import { Carousel } from 'react-bootstrap';
function Home() {
    const dispatch = useDispatch()
    const [selectedStoryId, setSelectedStoryId] = useState(null);
    const [imageStory, setImage] = useState(null)
    const [myStory, MystoryHandler] = useState()
    const story = useSelector(state => state.stories.otherStories)
    const following = useSelector(state => state.profile.following)
    const image = useSelector(state => state.profile)
    const data = useSelector(state => state.user.user)
    const storyHandler = (id) => {
        setSelectedStoryId(id);
    };

    useEffect(() => {
        dispatch(getFollowing())
        const userData = Cookies.load('user')
        dispatch(getImages())
        dispatch(uderData(userData))
    }, [])

    useEffect(() => {
        if (following) {
            following.Following.map((story) => {
                dispatch(getOtherStories(story.id))
            })
        }
    }, [following])

    useEffect(() => {
        try {
            if (imageStory !== null) {
                dispatch(uploadImage(imageStory))
            }
        } catch (e) {
            console.log(e);
        }
    }, [imageStory])


    return (
        <>
            {
                <Box display="flex" justifyContent='flex-start' alignItems='center' gap='40px' paddingLeft='10px'>
                    {
                        image.allImages &&
                        <Box position='relative'>
                            <Button
                                as="label"
                                htmlFor="file"
                                position='absolute'
                                zIndex='1'
                                size={['sm', 'md', 'md', 'md']}
                                left={'71%'}
                                top={'70%'}
                                backgroundColor='blue'
                                color='white'
                                className='btn'
                                rounded='30px'
                                maxW='0.5'
                                cursor='pointer'
                                _hover={{ bg: 'hoverColor' }}
                            >
                                <BsFillPencilFill />
                            </Button>
                            <Avatar
                                size={['lg', 'xl', 'xl']}
                                src={image.allImages.profileImg}
                                cursor="pointer"
                                onClick={() => MystoryHandler(true)}
                            />
                        </Box>
                    }

                    {following &&
                        following.Following.map((story) => (
                            <Box>

                                <Avatar
                                    size={['lg', 'xl', 'xl']}
                                    src={story.img}
                                    cursor="pointer"
                                    onClick={() => storyHandler(story.id)}
                                />
                                <Input
                                    type="file"
                                    id="file"
                                    display="none"
                                    onChange={(event) => {
                                        setImage(event.target.files[0]);
                                    }}
                                />
                            </Box>
                        ))
                    }

                </Box>
            }
            <Divider orientation='horizontal' />
            <div className='auth-profile' >
                <Card maxW='md'>
                    <CardHeader>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                <Box>
                                    <Heading size='sm'>Segun Adebayo</Heading>
                                    <Text>Creator, Chakra UI</Text>
                                </Box>
                            </Flex>
                            <IconButton
                                variant='ghost'
                                colorScheme='gray'
                                aria-label='See menu'
                                icon={<BsThreeDotsVertical />}
                            />
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            With Chakra UI, I wanted to sync the speed of development with the speed
                            of design. I wanted the developer to be just as excited as the designer to
                            create a screen.
                        </Text>
                    </CardBody>
                    <Image
                        objectFit='cover'
                        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Chakra UI'
                    />

                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}
                    >
                        <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                            Like
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                            Comment
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                            Share
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            {selectedStoryId ? <Otherstories id={selectedStoryId} setSelectedStoryId={setSelectedStoryId} /> : null}
            {myStory ? < Mystory MystoryHandler={MystoryHandler} /> : null}
        </>
    )

    // import React, { useEffect, useState } from "react";
    // import { homeSocket } from "../../../../App";
    // import { Search2Icon } from "@chakra-ui/icons";
    // import { setSearchWord } from "../../../../store/reducers/Search";
    // import { useDispatch } from "react-redux";
    // import { useNavigate } from "react-router";
    // import Posts from "../../../components/posts";
    // import "./Home.scss";
    // import { decodeToken } from "react-jwt";
    // import cookies from "react-cookies";
    // import axios from "axios";

    // function Home() {
    //   const [homePosts, sethomePosts] = useState([]);

    //   const dispatch = useDispatch();
    //   const Navigator = useNavigate();

    //   const setSearchWorldHandler = (e) => {
    //     const value = e.target.value;
    //     if (e.key === "Enter" && value.trim() !== "") {
    //       dispatch(setSearchWord(e.target.value));
    //       Navigator("/search");
    //     }
    //   };

    //   const token = cookies.load("user_session");
    //   const parsedToken = decodeToken(token);

    //   console.log(parsedToken.userId);


    //   useEffect(() => {
    //     try {
    //       const response = axios.get(
    //         `http://localhost:3002/fullyFeeds/${parsedToken.userId}`
    //       );
    //       response.then((data) => {
    //         console.log(data, "!!!!!!!!!!!!!!!");
    //         sethomePosts(data.data);
    //       });
    //     } catch (e) {
    //       console.log("error while fetching home posts");
    //     }
    //   }, []);

    //   useEffect(() => {
    //     try {
    //       const token = cookies.load('user_session');
    //       const response = axios.get(
    //         `http://localhost:3002/home`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           }
    //         }
    //       );
    //       response.then((data) => {
    //         console.log(data, "!!!!!!!!!!!!!!!");
    //         sethomePosts(data.data);
    //       });
    //     } catch (e) {
    //       console.log("error while fetching home posts");
    //     }
    //   }, []);


    //   return homePosts.length!==0 ? (
    //     <div className="auth-profile">
    //       <div className="search-bar-home">
    //         <Search2Icon className="search-icon-home" />
    //         <input
    //           type="search"
    //           placeholder="Type your search.."
    //           maxLength={30}
    //           onKeyDown={setSearchWorldHandler}
    //         />
    //       </div>
    //       <Posts posts={homePosts} />
    //     </div>
    //   ) : (
    //     <div className="welcome">
    //       <div className="welcome-container">
    //         <h1>Welcome 😺</h1>
    //         <p>
    //           It looks like you are new here, please press on the button below so
    //           you can search and discover more
    //         </p>
    //         <div>
    //           <button onClick={()=>Navigator("/search")}>Discover 🚀</button>
    //         </div>
    //       </div>
    //     </div>
    //   );

    // }
}
export default Home;
