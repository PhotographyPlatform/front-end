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
} from '@chakra-ui/react';
import { logOut } from '../../../../store/reducers/auth/user.reducer'
import { BsThreeDotsVertical } from 'react-icons/bs';
// import { FaLocationArrow } from 'react-icons/fa';
import { profileEdit } from '../../../../store/reducers/auth/user.reducer'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const userData = cookies.load('user')
    const submitHandler = (e) => {
        e.preventDefault()
        const obj = {
            email: e.target.email.value,
            firstName: e.target.fname.value,
            lastName: e.target.lname.value,
            address: e.target.address.value,
            gender: e.target.options.value,
            birthday: e.target.bday.value,
            username: e.target.username.value
        }
        dispatch(profileEdit(obj))
    }
    useEffect(() => {
        if (userData) {
            const decodedData = CryptoJS.AES.decrypt(userData, 'pixel').toString(CryptoJS.enc.Utf8)
            const parsed = JSON.parse(decodedData)
            setData(parsed)
        } else {
            dispatch(logOut());
            navigate('/signin')
        }
    }, [data])
    return (
        <div>

            <Card maxW='md'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={data.username} />

                            <Box>
                                <Heading size='sm'>{`Full Name : ${data.firstName}  ${data.lastName}`}</Heading>
                                <Text>first Name: {data.firstName}</Text>
                                <Text>last Name: {data.lastName}</Text>
                                <Text>Location: {data.address}</Text>
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
                        Email : {data.email}
                    </Text>
                    <Text>
                        Bday : {data.birthday}
                    </Text>
                    <Text>
                        gender : {data.gender}
                    </Text>
                    <Text>
                        username : {data.username}
                    </Text>
                </CardBody>
            </Card>
            <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
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
            </Container >
        </div>
    )
}

export default Profile
