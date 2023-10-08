import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SignUp from './components/Pages/@auth/signup/Signup';
import Code from './components/Pages/@auth/signup/codes/Code';
import Signin from './components/Pages/@auth/signin/Signin';
import AuthHome from './components/Pages/@auth/Home';
import NonAuthHome from './components/Pages/NonAuthHome/NonAuthHome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ForgotPassword from './components/Pages/@auth/forgetPass/Forget';
import ResetPassword from './components/Pages/@auth/forgetPass/ResetPass';
import cookies from 'react-cookies';
import { decodeToken } from 'react-jwt';
import Profile from './components/Pages/@auth/profileDashboard/Profile';
import Messages from './components/Pages/@auth/Chat/Messages';
import Chat from './components/Pages/@auth/Chat/Chat';
import { io } from 'socket.io-client';
import MessagePage from './components/Pages/@auth/Chat/MessagePage';

const host = "http://localhost:3002";
export const socket = io.connect(host, { transports: ["websocket"] });


function App() {
  const state = useSelector(state => state.user)
  const Logged = state.user.isLogged
  const isAuth = cookies.load('user_session')
  const decodeAuth = decodeToken(isAuth);

  const [notification , setNotification] = useState(false)
    
  useEffect(() => {

  }, [Logged])


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/code' element={<Code />} />
        <Route path='/pass' element={<ForgotPassword />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<Signin />} />
        {
          decodeAuth && decodeAuth.userId ?
            <Route path='/' element={<AuthHome />} />
            : <Route path='/' element={<NonAuthHome />} />
        }
        {
          decodeAuth && decodeAuth.userId &&
          <>
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/messages/:id' element={<Messages setNotification={setNotification } />} /> */}
          <Route path='/messages/:id' element={<MessagePage setNotification={setNotification } />} />
              
            <Route path='/chat' element={<Chat setNotification={setNotification} />} />
            
            {/* <Route path='/messages/:id' element={<Chat setNotification={setNotification } />} /> */}
          </>
        }
      </Routes>
    </div>
  );
}

export default App;
