import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from './components/Pages/@auth/index';
import Cookies from 'react-cookies';
import { decodeToken } from 'react-jwt';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/Pages/@auth/profileDashboard/Profile';
import AuthHome from './components/Pages/@auth/Home/index'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import theme from './components/theme/theme'
import Test from './components/Pages/@auth/signin/Signin';
import Search from './components/Pages/Search';

import {
  ThemeProvider,
} from '@chakra-ui/react'
function App() {
  const isAuth = Cookies.load('user_session');
  const decodeAuth = decodeToken(isAuth);
  const userState = useSelector((state) => state.user);
  const Logged = userState.isLogged;

  useEffect(() => {
  }, [Logged]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {decodeAuth && decodeAuth.userId ? (
          <Layout>
            <Routes>
              <Route path="/" element={<AuthHome />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        ) :
          <Container />
        }
      </ThemeProvider>
    </div>
  );
}

export default App;
