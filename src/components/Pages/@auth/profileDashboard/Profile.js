import React, { useEffect, useState } from 'react'
import cookies from 'react-cookies'
import CryptoJS from 'crypto-js';
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
    Icon
} from '@chakra-ui/react';
import { logOut, uderData } from '../../../../store/reducers/auth/user.reducer'
import { profileEdit } from '../../../../store/reducers/profile/profile.reducer'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import photography from '../../../assets/camera-photography.jpg'

function Profile() {
    const navigate = useNavigate()
    const state = useSelector(state => state.user)
    const dispatch = useDispatch()
    const userData = cookies.load('user')
    const data = state.user
    const submitHandler = (e) => {
        e.preventDefault()
        const obj = {
            email: e.target.email.value !== '' ? e.target.email.value : null,
            firstName: e.target.fname.value !== '' ? e.target.fname.value : null,
            lastName: e.target.lname.value !== '' ? e.target.lname.value : null,
            address: e.target.address.value !== '' ? e.target.address.value : null,
            gender: e.target.options.value !== '' ? e.target.options.value : null,
            birthday: e.target.bday.value !== '' ? e.target.bday.value : null,
            username: e.target.username.value !== '' ? e.target.username.value : null
        }
        dispatch(profileEdit(obj))
    }

    useEffect(() => {
        if (userData) {
            dispatch(uderData(userData))
        } else {
            dispatch(logOut());
            navigate('/signin')
        }
    }, [])
    return (
        <Container maxW='2xl'>
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
                    <Image src={photography} objectFit='cover' maxW={{ base: '700px', md: '715px', lg: '1200px', xl: '1200px' }} width={{ base: '700px', md: '715px', lg: '950px', xl: '1200px' }} height='300px' />
                    <Avatar position='absolute' top={{ base: '88%', sm: '90%', md: '93%', lg: '90%' }} size={{ base: 'md', sm: 'lg', md: 'xl' }} name={data.username} />
                </Stack>
                <Stack>
                    <Text fontSize='3xl'>{data.username}</Text>
                    <Text fontSize='2xl'>{data.address}</Text>
                    <HStack justifyContent='center' gap='30px'>
                        <Text fontSize='xl' fontWeight='bold'>Followers <Text>20</Text> </Text>
                        <Text fontSize='xl' fontWeight='bold'>Followers <Text>77</Text> </Text>
                    </HStack>
                </Stack>
                <Divider />
            </Stack>
        </Container>
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