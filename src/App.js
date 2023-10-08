import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from './components/Pages/@auth/index';
import Cookies from 'react-cookies';
import { decodeToken } from 'react-jwt';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/Pages/@auth/profileDashboard/Profile';
import Messages from './components/Pages/@auth/Chat/Messages';
import Chat from './components/Pages/@auth/Chat/Chat';
import { io } from 'socket.io-client';
import MessagePage from './components/Pages/@auth/Chat/MessagePage';

const host = "http://localhost:3002";
export const socket = io.connect(host, { transports: ["websocket"] });

import AuthHome from './components/Pages/@auth/Home/index'
import { useSelector } from 'react-redux';
import { useEffect  , useState} from 'react';
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
  const [notification , setNotification] = useState(false)
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
              {/* <Route path='/messages/:id' element={<Messages setNotification={setNotification } />} /> */}
              <Route path='/messages/:id' element={<MessagePage setNotification={setNotification } />} />
              <Route path='/chat' element={<Chat setNotification={setNotification} />} />
              {/* <Route path='/messages/:id' element={<Chat setNotification={setNotification } />} /> */}
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
