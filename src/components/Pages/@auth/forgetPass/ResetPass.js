'use strict'

import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import CryptoJS from 'crypto-js';

import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    const navigate = useNavigate()
    const [wrong, setWrong] = useState(false)
    const [alert, setAlert] = useState(false)
    const submitHandler = async (e) => {
        e.preventDefault();
        const obj = {
            newPassword: e.target.newPass.value,
            confirmPass: e.target.confirm.value,
        }
        console.log(obj);
        if (obj.newPassword === obj.confirmPass) {
            const id = localStorage.getItem('id')
            const data = await axios.post(`http://localhost:3002/resetPassword/${id}`, obj)
            if (data.status === 200) {
                const getData = localStorage.getItem('Remember_Me')
                const decodedData = CryptoJS.AES.decrypt(getData, 'pixel').toString(CryptoJS.enc.Utf8)
                const parsed = JSON.parse(decodedData)
                const changed = {
                    username: parsed.username,
                    password: obj.newPassword
                }
                localStorage.removeItem('Remember_Me')
                const dataToEncrypt = JSON.stringify(changed)
                const secretKey = process.env.SECRETKEY || 'pixel'
                const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
                localStorage.setItem('Remember_Me', encryptedData)
                setWrong(false)
                setAlert(true)
                setTimeout(() => {
                    navigate('/signin')
                }, 5000)
            }
        } else {
            setWrong(true)
        }
    }
    return (
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
                my={12}>\
                {!alert &&
                    <form onSubmit={submitHandler}>
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                            Enter new password
                        </Heading>

                        <FormControl id="email" isRequired>
                            <FormLabel>New Password</FormLabel>
                            <Input type="password" name='newPass' />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type="password" name='confirm' />
                        </FormControl>
                        <Stack spacing={6}>
                            <Button
                                type='submit'
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Submit
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
                            Your Password has been changed
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            You will be Automatically Redirected to Login page in 5 seconeds
                        </AlertDescription>
                    </Alert>
                }
                {
                    wrong &&
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Both Password Must Match</AlertTitle>
                    </Alert>
                }
            </Stack>
        </Flex >
    )
}