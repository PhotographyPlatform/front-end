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
import Animation from '../signin/Animation'
const VARIANT_COLOR = 'teal'

export default function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [error, setError] = useState('')
    const submitHandler = async (e) => {
        try {
            e.preventDefault()

            // const obj = {
            //     email: e.target.email.value,
            //     firstName: e.target.fname.value,
            //     lastName: e.target.lname.value,
            //     password: e.target.password.value,
            //     address: e.target.address.value,
            //     gender: e.target.options.value,
            //     birthday: e.target.bday.value,
            //     username: e.target.username.value
            // }
            const obj = {
                email: 'moh122@gmail.com',
                firstName: 'Mohammad',
                lastName: 'Attallah',
                password: '123',
                address: 'amman',
                birthday: '1999-12 - 12',
                username: 'osama'
            }
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
        <Container maxW="2xl" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} backgroundColor='white' >
            <form onSubmit={submitHandler}>

                <Stack spacing="8">
                    {/* <Stack spacing="6">
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'xs', md: 'sm' }}>Register</Heading>
                        </Stack>
                    </Stack> */}
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg={{ base: 'transparent', sm: 'bg.surface' }}
                        boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <Stack spacing="6" >
                            <Box textAlign='center'>
                                <Heading>Sign Up</Heading><br />
                                <Divider />
                            </Box>
                            <Stack spacing="5">
                                <Stack justifyContent='space-between' direction="row">
                                    <FormControl>
                                        <FormLabel htmlFor="fname">First Name</FormLabel>
                                        <Input id="fname" type="text" />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="lname">Last Name</FormLabel>
                                        <Input id="lname" type="text" />
                                    </FormControl>
                                </Stack>
                                <FormControl >
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input id="email" type="email" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="username">User Name</FormLabel>
                                    <Input id="username" type="text" />
                                </FormControl>
                                <Stack direction="row">
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
                                </Stack>
                                <FormControl id='options'>
                                    <FormLabel htmlFor="select" >Gender</FormLabel>
                                    <Select placeholder="Male / Female" >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Select>
                                </FormControl>
                                <PasswordField />
                            </Stack>
                            <Stack direction='row'>
                                <Checkbox defaultChecked>I have read and agreed to the</Checkbox>
                                <Link variant="text" size="sm" style={{ textDecoration: 'underline lightblue', color: 'black' }} href='#'>
                                    Terms of use
                                </Link>
                                <Link variant="text" size="sm" style={{ textDecoration: 'underline lightblue', color: 'black' }} href='#'>
                                    Privacy notice
                                </Link>

                            </Stack>
                            <Stack spacing="6">
                                <Button type='submit'>Sign Up</Button>
                                <HStack>
                                    <Divider />
                                </HStack>
                                <Text color="fg.muted">
                                    Already have an account? <Link href="signin" style={{ textDecoration: 'underline lightblue' }}>Sign In</Link>
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
            <Animation />
        </Container >
    )
}