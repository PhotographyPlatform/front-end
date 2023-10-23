import React, { useEffect, useState } from 'react'
import cookies from 'react-cookies'
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
    Stack,
    FormControl,
    FormLabel,
    Input,
    Select,
    HStack,
    Container,
    Checkbox,
    Divider,
    Center,
    Grid,
    GridItem,
    Icon,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure,
    ModalBody,
    Modal,
    ModalHeader,
    ModalFooter,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    FormHelperText,
} from '@chakra-ui/react';
import { BsCamera, BsFillPencilFill } from 'react-icons/bs'
import { logOut, uderData } from '../../../../store/reducers/auth/user.reducer'
import { profileEdit, update, getFollowing, getFollowers, uploadImage, uploadHero, getImages } from '../../../../store/reducers/profile/profile.reducer'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import photography from '../../../assets/camera-photography.jpg'
import { homeSocket } from '../../../../App';
import FollowersModal from './FollowersModal'
import './style.scss'
import axios from 'axios';
import { setTrue } from '../../../../store/reducers/profile/refresh';
import Posts from '../../../components/posts';
import placeholder from '../../../assets/cover-1.png'
import MainFooter from '../../Footer';
import { IoLocationOutline } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';

function Profile() {
    const [profileImage, setprofileImage] = useState(null);
    const [heroImage, setheroImage] = useState(null);
    const [showFollowersModal, setShowFollowersModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [updateObj, setObj] = useState({})
    const [images, setPost] = useState([])
    console.log(images);
    const navigate = useNavigate()
    const state = useSelector(state => state.user)
    const image = useSelector(state => state.profile)
    const profileState = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const userData = cookies.load('user')
    const data = state.user
    const { isOpen, onOpen, onClose } = useDisclosure()
    const refreshState = useSelector(state => state.refresh)
    const url = process.env.REACT_APP_URL;


    const handleClick = () => {
        onOpen()
    }

    const handleFollowersClick = () => {
        setShowFollowersModal(!showFollowersModal);
    };

    const handleFollowingClick = () => {
        setShowFollowingModal(!showFollowingModal)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const obj = {
            email: e.target.email.value ? e.target.email.value : null,
            firstName: e.target.firstName.value ? e.target.firstName.value : null,
            lastName: e.target.lastName.value ? e.target.lastName.value : null,
            address: e.target.address.value ? e.target.address.value : null,
            birthday: e.target.bday ? e.target.bday.value : null,
            username: e.target.username.value !== data.username ? e.target.username.value : null,
        };

        if (profileImage !== null) {
            dispatch(uploadImage(profileImage))
            dispatch(setTrue())
        }
        if (heroImage !== null) {
            dispatch(uploadHero(heroImage))
            dispatch(setTrue())
        }

        setObj(obj)
        dispatch(profileEdit(obj))
        onClose()
    }
    useEffect(() => {
        if (profileState.profile === 200) {
            if (updateObj.username === null) {
                updateObj.username = data.username
                dispatch(update(updateObj))
            } else {
                dispatch(update(updateObj))
            }
        }
    }, [profileState])

    useEffect(() => {
        if (userData) {
            cookies.remove('id')
            dispatch(uderData(userData))
            dispatch(getFollowers())
            dispatch(getFollowing())
            dispatch(getImages())
        } else {
            dispatch(logOut());
            navigate('/signin')
        }
    }, [userData, refreshState])

    const fetchData = async () => {
        try {
            const token = cookies.load('user_session');
            const response = await axios.get(`${url}/getallPostUser`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setPost(response.data.posts)
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <>
                <Stack
                    as={Box}
                    spacing={{ base: 8, md: 16 }}
                >
                    <Stack
                        direction={'column'}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}
                    >

                        {
                            image.allImages &&
                            <Image
                                src={image.allImages.heroImage || placeholder}
                                objectFit="cover"
                                maxW={['100%', '100%', '100%', '100%', '100%']}
                                width={['100%', '100%', '100%', '1000px', '1260px']}
                                height="350px"
                            />
                        }
                        {
                            image.allImages &&
                            <Avatar
                                position="absolute"
                                top={['88%', '90%', '93%', '90%']}
                                size={['xl', 'xl', '2xl']}
                                src={image.allImages.profileImg}
                            />
                        }
                    </Stack>
                    <Stack gap='0'>
                        <Box display='flex' justifyContent='flex-end'>
                            <Button
                                className='btn-profile'
                                onClick={handleClick}
                                style={{
                                    transition: 'background-color 0.3s ease',
                                    backgroundColor: '#3F72AF',
                                    color: '#F9F7F7',
                                    borderColor: '#112D4E',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            >
                                <BsFillPencilFill />
                            </Button>
                        </Box>
                        <Text fontSize='3xl' marginBottom='0' className='name-profile'>{`${data.firstName} ${data.lastName}`}  </Text>
                        <Text fontSize='2xl' className='address-profile'> {data.address}   <MdLocationOn /> </Text>
                        <HStack justifyContent='center' gap='30px'>
                            {profileState.followers && (
                                <Text fontSize='xl' fontWeight='bold' cursor='pointer' onClick={handleFollowersClick} _hover={{ color: 'gray' }}>
                                    Followers <Text>{profileState.followers.Count || 0}</Text>
                                </Text>
                            )}
                            {profileState.following && (
                                <Text fontSize='xl' fontWeight='bold' cursor='pointer' onClick={handleFollowingClick} _hover={{ color: 'gray' }}>
                                    Following <Text>{profileState.following.Count || 0}</Text>
                                </Text>
                            )}

                        </HStack>
                        {showFollowersModal && profileState.followers.Count !== 0 ? <FollowersModal followers={true} /> : null}
                        {showFollowingModal && profileState.following.Count !== 0 ? <FollowersModal following={true} /> : null}
                    </Stack>
                </Stack>
                <Divider />
                <div>
                    {images && images.length > 0 ? (
                        <Posts posts={images} />
                    ) : (
                        <div className='empty-profile'>
                            <BsCamera size={100} />
                            <h4>Add New Post</h4>
                            <p>
                                Add New Post, they will appear on your profile.
                            </p>

                        </div>
                    )}
                </div>

                {/*/ Edit profile Modal/*/}

                <Modal onClose={onClose} size='2xl' isOpen={isOpen}>
                    < form onSubmit={submitHandler} >
                        <ModalOverlay
                            bg='blackAlpha.300'
                            backdropFilter='blur(10px) '
                        />
                        <ModalContent>
                            <ModalHeader>Edit Profile</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Stack
                                    as={Box}
                                    spacing={{ base: 9, md: 10 }}
                                >
                                    <Stack
                                        direction={'column'}
                                        align={'center'}
                                        alignSelf={'center'}
                                        position={'relative'}>
                                        <Button
                                            as="label"
                                            htmlFor="hero-file-input"
                                            position="absolute"
                                            bg='Background'
                                            color='white'
                                            left={['56%', '55%', '54%', '93%']}
                                            top={['99%', '100%', '100%', '1%']}
                                            rounded='30px'
                                            width='40px'
                                            className='btn'
                                            cursor='pointer'
                                            _hover={{ bg: 'hoverColor' }}
                                        >
                                            <BsFillPencilFill />
                                        </Button>

                                        <Input
                                            type="file"
                                            id="hero-file-input"
                                            display="none"
                                            onChange={(event) => {
                                                setheroImage(event.target.files[0]);
                                            }}
                                        />
                                        {
                                            image.allImages &&
                                            <Image
                                                src={heroImage && URL.createObjectURL(heroImage) || image.allImages.heroImage || placeholder}
                                                objectFit="cover"
                                                maxW={['420px', '768px', '992px', '1200px', '1260px']}
                                                width={['100%', '490px', '620px', '600px', '630px']}
                                                height="220px"
                                            />
                                        }
                                        {
                                            image.allImages &&
                                            <Avatar
                                                position='absolute'
                                                top={['76%', '82%', '93%', '70%']}
                                                size={['xl', 'xl', 'xl']}

                                                src={profileImage && URL.createObjectURL(profileImage) || image.allImages.profileImg}
                                            />
                                        }
                                        <Button
                                            as="label"
                                            htmlFor="file-input"
                                            position="absolute"
                                            left={['56%', '55%', '54%', '54%']}
                                            top={['99%', '100%', '100%', '96%']}
                                            bg='Background'
                                            rounded='30px'
                                            color='white'
                                            width='40px'
                                            className='btn'
                                            cursor='pointer'
                                            _hover={{ bg: 'hoverColor' }}

                                        >
                                            <BsFillPencilFill />
                                        </Button>

                                        <Input
                                            type="file"
                                            id="file-input"
                                            display="none" // Hide the actual file input
                                            onChange={(event) => {
                                                setprofileImage(event.target.files[0]);
                                            }}
                                        />
                                        <BsFillPencilFill />
                                    </Stack>
                                    <Stack>
                                        <HStack marginTop='20px'>
                                            <FormControl>
                                                <FormLabel fontWeight='bold'>First Name</FormLabel>
                                                <Editable defaultValue={data.firstName} style={{ borderBottom: '1px solid #000', padding: '1%', width: '50%' }}>
                                                    <EditablePreview />
                                                    <EditableInput name='firstName' />
                                                </Editable>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontWeight='bold'>Last Name</FormLabel>
                                                <Editable defaultValue={data.lastName} style={{ borderBottom: '1px solid #000', padding: '1%', width: '50%' }}>
                                                    <EditablePreview />
                                                    <EditableInput name='lastName' />
                                                </Editable>
                                            </FormControl>
                                        </HStack>
                                        <HStack>
                                            <FormControl>
                                                <FormLabel fontWeight='bold'>username</FormLabel>
                                                <Editable defaultValue={data.username} style={{ borderBottom: '1px solid #000', padding: '1%', width: '50%' }}>
                                                    <EditablePreview />
                                                    <EditableInput name='username' />

                                                </Editable>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontWeight='bold'>Address</FormLabel>


                                                <Editable defaultValue={data.address} style={{ borderBottom: '1px solid #000', padding: '1%', width: '50%' }}>
                                                    <EditablePreview />

                                                    <EditableInput name='address' />
                                                </Editable>
                                            </FormControl>
                                        </HStack>
                                        <HStack>
                                            <FormControl>
                                                <FormLabel fontWeight='bold'>Email</FormLabel>
                                                <Editable defaultValue={data.email} style={{ borderBottom: '1px solid #000', padding: '1%', width: '70%' }} >
                                                    <EditablePreview />
                                                    <EditableInput name='email' />
                                                </Editable>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontWeight='bold' htmlFor="bday">Birthday</FormLabel>
                                                <Input
                                                    defaultValue={data.birthday}
                                                    style={{ border: 'none', borderBottom: '1px solid #000', padding: '1%', width: '50%' }}
                                                    name='bday'
                                                    placeholder="Select Date"
                                                    size="md"
                                                    type="date"
                                                />
                                            </FormControl>
                                        </HStack>
                                    </Stack>
                                </Stack>
                            </ModalBody>
                            <ModalFooter>
                                <HStack spacing={6}>
                                    <Button onClick={onClose} className='btnClose'>Close</Button>
                                    <Button className='btn' color='white' type='submit'>Save Changes</Button>
                                </HStack>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                </Modal>
                <Divider />
                <HStack flexWrap='wrap' display='flex' justifyContent='flex-start' alignItems='center'>
                    {/* {images &&
                    images.map((item, index) => (
                        <Image key={index} src={item.imgurl} width='30%' />
                    ))} */}
                </HStack>
            </>
            <MainFooter />
        </div>
    )
}

export default Profile
