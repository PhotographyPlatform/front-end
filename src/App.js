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
import cookie from 'react-cookies';
import jwtDecode from "jwt-decode";
import MessagePage from './components/Pages/@auth/Chat/MessagePage';

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
import axios from 'axios';

// socket assets 
     
const host = "http://localhost:3002";
const homeHost = "http://localhost:3002/home";
export const socket = io.connect(host, { transports: ["websocket"] });
export const homeSocket = io.connect(homeHost, { transports: ["websocket"] });

//


function App() {
  const isAuth = Cookies.load('user_session');
  const decodeAuth = decodeToken(isAuth);
  const userState = useSelector((state) => state.user);

  const [render, setRender] = useState(true)
  
  const Logged = userState.isLogged;
  let userId = null
  let cookieData = null

  if (cookie.load('user_session')) {
    
    cookieData = cookie.load('user_session')
    const token = jwtDecode(cookieData)
    userId = token.userId
  }

  homeSocket.on('msgNotificaton', msg => {
    console.log(msg , 'from server');
    getNotification()
  })

  async function getNotification() {
    try {
      const result = await axios.get('http://localhost:3002/allUserMessages', { headers: { Authorization: `Bearer ${cookieData}` } })
      let notificationCount = result.data.recievedData.filter(ele => {
        return ele.read === false
      })
      console.log('notificationCount' , notificationCount.length);
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    homeSocket.emit("joinHomeRoom", userId);
    getNotification()
  }, [Logged]);




  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {decodeAuth && decodeAuth.userId ? (
          <Layout>
            <Routes>
              <Route path="/" element={<AuthHome />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/messages/:id' element={<MessagePage render={render} setRender = {setRender} />} />
              <Route path='/chat' element={<Chat />} />
              {/* <Route path='/messages/:id' element={<Messages setNotification={setNotification } />} /> */}
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
