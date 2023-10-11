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
import { BsFillPencilFill } from 'react-icons/bs'
import { logOut, uderData } from '../../../../store/reducers/auth/user.reducer'
import { profileEdit, update, getFollowing, getFollowers } from '../../../../store/reducers/profile/profile.reducer'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import photography from '../../../assets/camera-photography.jpg'
import FollowersModal from './FollowersModal'
import './style.scss'
import axios from 'axios';
function Profile() {
    const [showFollowersModal, setShowFollowersModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [updateObj, setObj] = useState({})
    const [images, setImage] = useState([])
    const navigate = useNavigate()
    const state = useSelector(state => state.user)
    const profileState = useSelector(state => state.profile)
    // console.log(profileState.profile);
    const dispatch = useDispatch()
    const userData = cookies.load('user')
    const data = state.user
    const { isOpen, onOpen, onClose } = useDisclosure()
    const refreshState = useSelector(state => state.refresh)
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
        } else {
            dispatch(logOut());
            navigate('/signin')
        }
    }, [userData, refreshState])

    useEffect(() => {
        axios.get('https://api.slingacademy.com/v1/sample-data/photos').then(data => {
            setImage(data.data.photos);
        })
    }, [])

    return (
        <>
            <Container maxW='2xl' >
                <Stack
                    as={Box}
                    spacing={{ base: 8, md: 16 }}
                    py={{ base: 1, md: 3 }}>
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}>
                        <Image
                            src={photography}
                            objectFit="cover"
                            maxW={['100%', '100%', '100%', '1200px', '1260px']}
                            width={['368px', '600px', '710px', '920px', '1000px']}
                            height="300px"
                        />
                        <Avatar
                            position="absolute"
                            top={['88%', '90%', '93%', '90%']}
                            size={['lg', 'lg', 'xl']}
                            name={data.username}
                        />
                        <Button
                            position="absolute"
                            left={['85%', '90%', '93%', '96%']}
                            top={['100%', '100%', '100%', '100%']}

                            bg='Background'
                            onClick={handleClick}
                        >
                            <BsFillPencilFill />
                        </Button>
                    </Stack>
                    <Stack>
                        <Text fontSize='3xl'>{`${data.firstName} ${data.lastName}`}</Text>
                        <Text fontSize='2xl'>{data.address}</Text>
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
                                    spacing={{ base: 8, md: 16 }}
                                    py={{ base: 1, md: 3 }}>
                                    <Stack
                                        direction={'column'}
                                        spacing={3}
                                        align={'center'}
                                        alignSelf={'center'}
                                        position={'relative'}>
                                        <Button
                                            position="absolute"
                                            left={['79%', '87%', '91%', '91%']}
                                            top={['3%', '2%', '2%', '3%']}
                                            bg='Background'
                                            onClick={handleClick}
                                            rounded='30px'
                                            color='white'
                                            className='btn'
                                        >
                                            <BsFillPencilFill />
                                        </Button>
                                        <Image
                                            src={photography}
                                            objectFit="cover"
                                            maxW={['420px', '768px', '992px', '1200px', '1260px']}
                                            width={['100%', '490px', '620px', '600px', '630px']}
                                            height="220px"
                                        />
                                        <Avatar
                                            position='absolute'
                                            top={['76%', '82%', '93%', '70%']}
                                            size={['xl', 'xl', 'xl']}
                                            name={data.username}
                                        />
                                        <Button
                                            position="absolute"
                                            left={['56%', '55%', '54%', '54%']}
                                            top={['99%', '100%', '100%', '92%']}
                                            bg='Background'
                                            onClick={handleClick}
                                            rounded='30px'
                                            color='white'
                                            width='40px'
                                            className='btn'
                                        >
                                            <BsFillPencilFill />
                                        </Button>
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
            </Container >
            <HStack flexWrap='wrap' display='flex' justifyContent='flex-start' alignItems='center'>
                {images &&
                    images.map((item, index) => (
                        <Image key={index} src={item.url} width='30%' />
                    ))}
            </HStack>
        </>
    )
}

export default Profile


// <Container display='flex' justifyContent='center' alignItems='center'>
//     <Box maxW='md'>
//         <Stack spacing='4'>
//             <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
//                 <Avatar name={data.username} />

//                 <Box>
//                     <Heading size='sm'>{`Full Name : ${data.firstName}  ${data.lastName}`}</Heading>
//                     <Text>first Name: {data.firstName}</Text>
//                     <Text>last Name: {data.lastName}</Text>
//                     <Text>Location: {data.address}</Text>
//                 </Box>
//             </Flex>
//         </Stack>
//         <Text>
//             Email : {data.email}
//         </Text>
//         <Text>
//             Bday : {data.birthday}
//         </Text>
//         <Text>
//             gender : {data.gender}
//         </Text>
//         <Text>
//             username : {data.username}
//         </Text>
//     </Box>
// </Container>


{/* <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
<form onSubmit={submitHandler}>
<Stack spacing="8">
<Box
py={{ base: '0', sm: '8' }}
px={{ base: '4', sm: '10' }}
bg={{ base: 'transparent', sm: 'bg.surface' }}
boxShadow={{ base: 'none', sm: 'md' }}
borderRadius={{ base: 'none', sm: 'xl' }}
>
<Stack spacing="6" >
<Stack spacing="5">
<FormControl >
<FormLabel htmlFor="email">Email</FormLabel>
<Input id="email" type="email" />
</FormControl>
<FormControl>
<FormLabel htmlFor="fname">First Name</FormLabel>
<Input id="fname" type="text" />
</FormControl>
<FormControl>
<FormLabel htmlFor="lname">Last Name</FormLabel>
<Input id="lname" type="text" />
</FormControl>
<FormControl>
<FormLabel htmlFor="username">User Name</FormLabel>
<Input id="username" type="text" />
</FormControl>
<FormControl>
<FormLabel htmlFor="address">Address</FormLabel>
<Input id="address" type="text" />
</FormControl>
<FormControl>
                            <FormLabel htmlFor="bday">Birthday</FormLabel>
                            <Input
                            name='bday'
                            placeholder="Select Date"
                            size="md"
                            type="date"
                            />
                            </FormControl>
                            <FormControl id='options'>
                            <FormLabel htmlFor="select" >Gender</FormLabel>
                            <Select placeholder="Male / Female" >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            </Select>
                            </FormControl>
                            </Stack>
                            <Stack spacing="6">
                            <Button type='submit'>Edit</Button>
                            </Stack>
                            </Stack>
                            </Box>
                            </Stack>
                            </form >
                        </Container > */}






/// needed style 
{/* <Image src={photography} objectFit='cover' maxW={{ base: '420px', sm: '768px', md: '992px', lg: '1200px', xl: '1260px' }}
                    width={{ base: '368px', sm: '600px', md: '710px', lg: '920px', xl: '1000px' }} height='300px' /> */ }

// -------------------
{/* <Avatar position='absolute' top={{ base: '88%', sm: '90%', md: '93%', lg: '90%' }} 
                size={{ base: 'lg', sm: 'lg', md: 'xl' }} name={data.username} /> */ }

// ------------------------------
{/* <Button position='absolute' left={{ base: '83%', sm: '84%', md: '88%', lg: '87%' }} top={{ base: '67%', sm: '70%', md: '56%', lg: '56%' }}><GrEdit /></Button> */ }
{/* <Stack justifyContent='center' alignItems='center'>
                    <Button
                        position="absolute"
                        left={['83%', '84%', '88%', '89%']}
                        top={['67%', '70%', '56%', '20%']}
                        bg='Background'
                        onClick={handleClick}
                        rounded='30px'
                        color='white'
                        className='btn'
                    >
                        <BsFillPencilFill />
                    </Button>
                    <Image
                        src={photography}
                        objectFit="cover"
                        maxW={['420px', '768px', '992px', '1200px', '1260px']}
                        width={['370px', '460px', '620px', '600px', '630px']}
                        height="220px"
                    />
                    <Avatar
                        position='absolute'
                        top={['73%', '70%', '93%', '70%']}
                        size={['lg', 'lg', 'xl']}
                        name={data.username}
                    />
                    <Button
                        position="absolute"
                        left={['83%', '84%', '88%', '54%']}
                        top={['67%', '70%', '56%', '80%']}
                        bg='Background'
                        onClick={handleClick}
                        rounded='30px'
                        color='white'
                        width='40px'
                        className='btn'
                    >
                        <BsFillPencilFill />
                    </Button>
                </Stack> */}

// <FormLabel fontWeight='bold'>First Name</FormLabel>
//<Input type='text' defaultValue={data.username} style={{ border: 'none', borderBottom: '1px solid #000', padding: '1%', width: '50%' }} />