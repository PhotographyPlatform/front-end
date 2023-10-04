import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Select,
    Stack,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import axios from 'axios'
import { PasswordField } from './passwordFiled/Password'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
export default function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const [error, setError] = useState('');
    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            const obj = {
                email: e.target.email.value,
                firstName: e.target.fname.value,
                lastName: e.target.lname.value,
                password: e.target.password.value,
                address: e.target.address.value,
                gender: e.target.options.value,
                birthday: e.target.bday.value,
                username: e.target.username.value
            }
            // 

            localStorage.setItem('email', obj.email)
            const signUp = await axios.post('http://localhost:3002/signup', obj)
            if (signUp.status === 200) {
                navigate('/code')
            }
        } catch (e) {
            setError(e.response.data);
            onOpen();
        }
    }
    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <form onSubmit={submitHandler}>
                <Stack spacing="8">
                    <Stack spacing="6">
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'xs', md: 'sm' }}>Register</Heading>
                        </Stack>
                    </Stack>
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
                                <PasswordField />
                            </Stack>
                            <HStack justify="space-between">
                                <Checkbox defaultChecked>Remember me</Checkbox>
                                <Button variant="text" size="sm">
                                    Forgot password?
                                </Button>
                            </HStack>
                            <Stack spacing="6">
                                <Button type='submit'>Sign Up</Button>
                                <HStack>
                                    <Divider />
                                </HStack>
                                <Text color="fg.muted">
                                    Already have an account? <Link href="signin">Sign In</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form >
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
        </Container >
    )
}