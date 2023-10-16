import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from './components/Pages/@auth/index';
import Cookies from 'react-cookies';
import { decodeToken } from 'react-jwt';
import Layout from './components/Layout';
import { Route, Routes, useParams } from 'react-router-dom';
import Profile from './components/Pages/@auth/profileDashboard/Profile';
import Messages from './components/Pages/@auth/Chat/Messages';
import Chat from './components/Pages/@auth/Chat/Chat';
import { io } from 'socket.io-client';
import cookie from 'react-cookies';
import jwtDecode from "jwt-decode";
import MessagePage from './components/Pages/@auth/Chat/MessagePage';

import AuthHome from './components/Pages/@auth/Home/index'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import theme from './components/theme/theme'
import Test from './components/Pages/@auth/signin/Signin';
import Search from './components/Pages/Search';
import ViewPost from './components/Pages/Post/ViewPost';
import { layout } from '@chakra-ui/react';
import {
  ThemeProvider,
} from '@chakra-ui/react'
import UsersProfile from './components/Pages/@auth/profileDashboard/UsersProfile';
import Mystory from '../src/components/Pages/@auth/stories/Mystory'
import SidebarWithHeader from './components/ChakraLayout';
import { dispatchAllNotification, fetchUserListRedux, getNotification } from './store/reducers/chat/chatList.reducer';
import Challenges from './components/Pages/Challenges';
import { setNewNotifi, setRead } from './store/reducers/notificationAction';
import { setOldNotifi } from './store/reducers/notificationAction';

// socket assets 
const port = 3002;
const host = "http://localhost:3002";
const homeHost = "http://localhost:3002/home";
const nameSpacehost = `http://localhost:${port}/notification`;

export const socket = io.connect(host, { transports: ["websocket"] });
export const homeSocket = io.connect(homeHost, { transports: ["websocket"] });

export const notificationAction = io.connect(nameSpacehost, { transports: ["websocket"] });


function App() {
  const isAuth = Cookies.load('user_session');
  const decodeAuth = decodeToken(isAuth);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state.ChatList.AllNotification);
  const [render, setRender] = useState(true)
  const notifiRead = useSelector((state) => state.notification.read)

  let params = useParams()


  const Logged = userState.isLogged;
  let userId = null
  let cookieData = null

  if (cookie.load('user_session')) {

    cookieData = cookie.load('user_session')
    const token = jwtDecode(cookieData)
    userId = token.userId
  }

  useEffect(() => {

    homeSocket.on('msgNotificaton', msg => {
      dispatch(getNotification(cookieData))
    })

  }, [])

  // Notification Action (Post, Like, Comment,  Follow)
  notificationAction.emit("notification", userId);

  const notificationEvent = `notification-${userId}`;
  useEffect(() => {
    notificationAction.emit("notification", userId);
    notificationAction.on(notificationEvent, (payload) => {
      dispatch(setOldNotifi(payload))
    })
    // notificationAction.disconnect();

  }, [Logged])



  notificationAction.on(`newRecord-${notificationEvent}`, payload => {
    dispatch(setNewNotifi(payload))
  })

  useEffect(() => {
    homeSocket.emit("joinHomeRoom", userId);


    dispatch(getNotification(cookieData))

  }, [Logged]);



  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {decodeAuth && decodeAuth.userId ? (
          <SidebarWithHeader>
            <Routes>
              <Route path='/vv' element={<ViewPost />} />
              <Route path="/" element={<AuthHome />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/searchs' element={<Search />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path='/messages/:id' element={<MessagePage render={render} setRender={setRender} />} />
              <Route path='/chat' element={<Chat />} />
              <Route path="/userProfile" element={<UsersProfile />} />
//               <Route path='/story' element={<Mystory />} />
            </Routes>
          </SidebarWithHeader>
        ) :
          <Container />
        }
      </ThemeProvider>
    </div>
  );
}

export default App;
