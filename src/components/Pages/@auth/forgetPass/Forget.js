'use client'

import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Alert
} from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';

export default function ForgotPassword() {
    const [alert, setAlert] = useState(false)
    const submitHandler = async (e) => {
        e.preventDefault();
        const obj = {
            email: e.target.email.value
        }
        const data = await axios
            .post('http://localhost:3002/forgetPassword', obj)
        if (data.status === 200) {
            setAlert(true)
            localStorage.setItem('id', data.data.id)
        }
    }
    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    {
                        !alert &&
                        <form onSubmit={submitHandler}>
                            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                                Forgot your password?
                            </Heading>
                            <Text
                                fontSize={{ base: 'sm', sm: 'md' }}
                            // color={useColorModeValue('gray.800', 'gray.400')}
                            >
                                You&apos;ll get an email with a reset link
                            </Text>
                            <FormControl id="email">
                                <Input
                                    name='email'
                                    placeholder="your-email@example.com"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="email"
                                />
                            </FormControl><br />
                            <Stack spacing={6}>
                                <Button
                                    type='submit'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Request Reset
                                </Button>
                            </Stack>
                        </form>
                    }
                    {
                        alert &&
                        <Alert
                            status='success'
                            variant='subtle'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                            height='200px'
                        >
                            <AlertIcon boxSize='40px' mr={0} />
                            <AlertTitle mt={4} mb={1} fontSize='lg'>
                                We sent a reset link to this Email
                            </AlertTitle>
                            <AlertDescription maxWidth='sm'>
                                Please open the link to reset your password
                            </AlertDescription>
                        </Alert>
                    }
                </Stack>
            </Flex>
        </>

    )
}