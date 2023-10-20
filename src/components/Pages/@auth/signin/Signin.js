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
  // Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  AlertIcon,
  Alert
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { DecodeToken, signin } from '../../../../store/reducers/auth/user.reducer';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PasswordField } from '../signup/passwordFiled/Password';
import CryptoJS from 'crypto-js';
import Animation from './Animation';
import Header_Inhansed from '../../Header_Inhansed/Header_Inhansed';
const VARIANT_COLOR = 'teal';


const Signin = () => {
  return (
    
    <ColorModeProvider>
      <Header_Inhansed color={'#29383b'} bg={'white' }/>
      <CSSReset />
      <Animation />
      <LoginArea />
    </ColorModeProvider>
  );
};

const LoginArea = () => {
  return (
    <Flex minHeight='85vh' width='full' align='center' justifyContent='center' >
      <Box
        borderWidth={1}
        px={4}
        width='full'
        maxWidth='500px'
        borderRadius={4}
        textAlign='center'
        boxShadow='xl'
        background='white'
        paddingTop='15px'

      >

        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  );
};

// const ThemeSelector = () => {
//   const { colorMode, toggleColorMode } = useColorMode();

//   return (
//     <Box textAlign='right' py={4}>
//       <IconButton
//         icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
//         onClick={toggleColorMode}
//         variant="ghost"
//       />
//     </Box>
//   );
// };

const LoginHeader = () => {
  return (
    <Box textAlign='center'>
      <Heading>Pixel Time</Heading>
      <Text color="fg.muted" fontSize='17px'>
        Don't have an account? <Link to="/signup" color={`${VARIANT_COLOR}.500`}>Sign up</Link>
    // convert from href to to
//         Don't have an account? <Link href="/signup" color={`#3F72AF`}>Sign up</Link>
      </Text>
    </Box>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setCheck] = useState(false);
  const [data, setData] = useState();
  const [isOpen, setOpen] = useState(false);
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
      });

      dispatch(signin(data));
      dispatch(DecodeToken());
      if (data.status === 200) {
        if (isChecked) {
          const dataToEncrypt = JSON.stringify(obj);
          const secretKey = process.env.SECRETKEY || 'pixel';
          const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
          localStorage.setItem('Remember_Me', encryptedData);
        }
        // navigate('/')
        window.location.href = '/'

      }
    } catch (e) {
      setError(e.response.data);
      setOpen(true);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('Remember_Me');
    if (userData) {
      const decodedData = CryptoJS.AES.decrypt(userData, 'pixel').toString(CryptoJS.enc.Utf8);
      const parsed = JSON.parse(decodedData);
      setData(parsed);
    }
  }, []);

  return (
    <Box my={8} textAlign='left' style={{ position: 'relative', zIndex: 2 }}>
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
            <Checkbox isChecked={data ? !isChecked : isChecked} onChange={handleCheckboxChange}>Remember Me</Checkbox>
          </Box>
          <Box>
            <Link color={'#3F72AF'} href='/forgetPassword'>Forgot your password?</Link>
          </Box>
        </Stack>
        <br />
        <Stack>
          {isOpen && (
            <Alert status='error'>
              <AlertIcon />
              {error}
            </Alert>
          )}
        </Stack>
        <Button variantColor={VARIANT_COLOR} width='full' mt={4} type='submit'>
          Sign In
        </Button>

      </form>
    </Box>
  );
};

export default Signin;
