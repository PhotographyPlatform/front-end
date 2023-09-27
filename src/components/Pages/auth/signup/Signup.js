import {
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
} from '@chakra-ui/react'
import axios from 'axios'
import { PasswordField } from './passwordFiled/Password'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function SignUp() {
    const navigate = useNavigate()
    const state = useSelector(state => state)
    const submitHandler = (e) => {
        e.preventDefault()
        // const obj = {
        //     email: e.target.email.value,
        //     firstName: e.target.fname.value,
        //     lastName: e.target.lname.value,
        //     password: e.target.password.value,
        //     address: e.target.address.value,
        //     gender: e.target.options.value,
        //     username: e.target.username.value
        // }
        const obj = {
            email: 'hamza@gmail.com',
            firstName: 'hamza',
            lastName: 'tamari',
            password: '123',
            address: 'amman',
            gender: 'male',
            username: 'hamza.tamari'
        }
        const signUp = axios.post('http://localhost:3002/signup', obj)
        if (signUp) {
            navigate('/code')
        }
    }
    console.log(state);
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
                                    Already have an account? <Link href="#">Sign In</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form >
        </Container >
    )
}