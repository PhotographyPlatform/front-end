import { Center, Heading } from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    useDisclosure,
    Button,
    FormControl,
    Flex,
    Stack,
    useColorModeValue,
    HStack,
} from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handlePromise } from '../../../../../store/reducers/auth/user.reducer'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Code() {
    const email = localStorage.getItem('email')
    const URL = process.env.REACT_APP_URL;

    const navigate = useNavigate()
    const [pinValue, setPinValue] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [error, setError] = useState('');
    const handlePinChange = (value) => {
        setPinValue(value);
    };
    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            const data = await axios.post(`${URL}/signup/confirm`, { codes: pinValue })
            if (data.status === 200) {
                navigate('/signin')
            }
        } catch (e) {
            setError('wrong codes');
            setPinValue('')
            onOpen();
        }
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Stack
                        spacing={4}
                        w={'full'}
                        maxW={'sm'}
                        bg={useColorModeValue('white', 'gray.700')}
                        rounded={'xl'}
                        boxShadow={'lg'}
                        p={6}
                        my={10}>
                        <Center>
                            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                                Verify your Email
                            </Heading>
                        </Center>
                        <Center
                            fontSize={{ base: 'sm', sm: 'md' }}
                            color={useColorModeValue('gray.800', 'gray.400')}>
                            We have sent code to your email
                        </Center>
                        <Center
                            fontSize={{ base: 'sm', sm: 'md' }}
                            fontWeight="bold"
                            color={useColorModeValue('gray.800', 'gray.400')}>
                            {email}
                        </Center>
                        <FormControl>
                            <Center>
                                <HStack>
                                    <PinInput value={pinValue} onChange={handlePinChange} >
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </HStack>
                            </Center>
                        </FormControl>
                        <Stack spacing={6}>
                            <Button
                                type='submit'
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Verify
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
            </form>
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Error</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>{error}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            OK
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default Code;
