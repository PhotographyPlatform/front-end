
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
  Box,
  Flex,
  IconButton,
  useColorMode,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  HStack,
  Divider,
  AlertIcon,
  Alert
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { signin } from '../../../../store/reducers/auth/user.reducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PasswordField } from '../signup/passwordFiled/Password';
import CryptoJS from 'crypto-js';


const VARIANT_COLOR = 'teal'

const Signin = () => {

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <LoginArea />
      </ColorModeProvider>
    </ThemeProvider>
  )
}

const LoginArea = () => {
  return (
    <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
      <Box
        borderWidth={1}
        px={4}
        width='full'
        maxWidth='500px'
        borderRadius={4}
        textAlign='center'
        boxShadow='lg'
      >
        <ThemeSelector />
        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  )
}

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box textAlign='right' py={4}>
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Box>
  )
}

const LoginHeader = () => {
  return (
    <Box textAlign='center'>
      <Heading>Sign In to Your Account</Heading>
      <Text color="fg.muted" fontSize='17px'>
        Don't have an account? <Link href="/signup" color={`${VARIANT_COLOR}.500`}>Sign up</Link>
      </Text>
    </Box>
  )
}

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isChecked, setCheck] = useState(false)
  const [data, setData] = useState()
  console.log(data);
  const [isOpen, setOpen] = useState(false)
  const [error, setError] = useState('');
  const handleCheckboxChange = () => {
    setCheck(!isChecked);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const obj = {
        username: e.target.username.value,
        password: e.target.password.value
      }
      const data = await axios.post('http://localhost:3002/login', null, {
        headers: {
          Authorization: `Basic ${btoa(`${obj.username}:${obj.password}`)}`
        }
      })
      dispatch(signin(data))
      if (data.status === 200) {
        if (isChecked) {
          const dataToEncrypt = JSON.stringify(obj)
          const secretKey = process.env.SECRETKEY || 'pixel'
          const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
          localStorage.setItem('Remember_Me', encryptedData)
        }
        navigate('/')
      }
    } catch (e) {
      setError(e.response.data);
      setOpen(true);
    }
  }
  useEffect(() => {
    const userData = localStorage.getItem('Remember_Me')
    if (userData) {
      const decodedData = CryptoJS.AES.decrypt(userData, 'pixel').toString(CryptoJS.enc.Utf8)
      const parsed = JSON.parse(decodedData)
      setData(parsed)
    }
  }, [])

  return (
    <Box my={8} textAlign='left'>
      <form onSubmit={submitHandler}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type='text'
            placeholder='Enter your username'
            name='username'
            defaultValue={data ? data.username : ''}
          />
        </FormControl>

        <FormControl mt={4}>
          <PasswordField defaultValue={data ? data.password : ''} />
        </FormControl>

        <Stack isInline justifyContent='space-between' mt={4}>
          <Box>
            <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>Remember Me</Checkbox>
          </Box>
          <Box>
            <Link color={`${VARIANT_COLOR}.500`} href='/forgetPassword'>Forgot your password?</Link>
          </Box>
        </Stack><br />
        <Stack>
          {
            isOpen &&
            <Alert status='error'>
              <AlertIcon />
              {error}
            </Alert>
          }
        </Stack>
        <Button variantColor={VARIANT_COLOR} width='full' mt={4} type='submit'>Sign In</Button>
      </form>
    </Box >

  )
}

export default Signin