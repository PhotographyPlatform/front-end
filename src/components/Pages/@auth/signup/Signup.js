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
import Header_Inhansed from '../../Header_Inhansed/Header_Inhansed'
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
        <>
        <Header_Inhansed color={'#29383b'} bg={'white' } />
        <Container maxW="xl" px="8" backgroundColor="white" marginTop='10px'>

            <form onSubmit={submitHandler}>
                <Stack spacing="4">
                    <Box
                        px="4"
                        bg="transparent"
                        boxShadow="md"
                        borderRadius="xl"
                    >
                        <Stack>
                            <Box textAlign="center">
                                <Heading>Sign Up</Heading>
                                <Divider />
                            </Box>
                            <Stack spacing="2">
                                <Stack direction="row">
                                    <FormControl flex="1">
                                        <FormLabel htmlFor="fname">First Name</FormLabel>
                                        <Input id="fname" type="text" />
                                    </FormControl>
                                    <FormControl flex="1">
                                        <FormLabel htmlFor="lname">Last Name</FormLabel>
                                        <Input id="lname" type="text" />
                                    </FormControl>
                                </Stack>
                                <FormControl>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input id="email" type="email" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="username">User Name</FormLabel>
                                    <Input id="username" type="text" />
                                </FormControl>
                                <Stack direction="row">
                                    <FormControl flex="1">
                                        <FormLabel htmlFor="address">Address</FormLabel>
                                        <Input id="address" type="text" />
                                    </FormControl>
                                    <FormControl flex="1">
                                        <FormLabel htmlFor="bday">Birthday</FormLabel>
                                        <Input
                                            name="bday"
                                            placeholder="Select Date"
                                            size="md"
                                            type="date"
                                        />
                                    </FormControl>
                                </Stack>
                                <FormControl id="options">
                                    <FormLabel htmlFor="select">Gender</FormLabel>
                                    <Select placeholder="Male / Female">
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
                            <Button type="submit">Sign Up</Button>
                            <Text color="fg.muted">
                                Already have an account?{' '}
                                <Link href="signin" style={{ textDecoration: 'underline lightblue' }}>
                                    Sign In
                                </Link>
                            </Text>
                        </Stack>
                    </Box>
                </Stack>
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
            <Animation />
        </Container>

     </>
    )
}