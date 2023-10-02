'use strict'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

import { signinHandler } from '../../../../store/reducers/auth/user.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function Signin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(state => state.user)
    const submitHandler = (e) => {
        try {
            e.preventDefault();
            const obj = {
                username: e.target.username.value,
                password: e.target.password.value
            }
            dispatch(signinHandler(obj))
            if (state.user.isLogged === true) {
                navigate('/')
            } else {
                console.log('wrong validation');
            }
        } catch (e) {
            console.log('server error');
        }
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
                    </Text>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="username">
                                <FormLabel>UserName</FormLabel>
                                <Input type="text" />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link to='/pass'> <Text color={'blue.400'}>Forgot password?</Text> </Link>
                                </Stack>
                                <Button
                                    type='submit'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    )
}