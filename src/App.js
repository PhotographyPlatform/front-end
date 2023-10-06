import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SignUp from './components/Pages/@auth/signup/Signup';
import Code from './components/Pages/@auth/signup/codes/Code';
import AuthHome from './components/Pages/@auth/Home';
import NonAuthHome from './components/Pages/NonAuthHome/NonAuthHome';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ForgotPassword from './components/Pages/@auth/forgetPass/Forget';
import ResetPassword from './components/Pages/@auth/forgetPass/ResetPass';
import cookies from 'react-cookies';
import { decodeToken } from 'react-jwt';
import Profile from './components/Pages/@auth/profileDashboard/Profile';
import Test from './components/Pages/@auth/signin/Signin';
import {
  ThemeProvider,
  theme
} from '@chakra-ui/react'
// import Sidebar from './components/Pages/@auth/profileDashboard/sidebar/Sidebar';
function App() {
  const state = useSelector(state => state.user)
  const Logged = state.user.isLogged
  const isAuth = cookies.load('user_session')
  const decodeAuth = decodeToken(isAuth);
  useEffect(() => {

  }, [Logged])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path='/code' element={<Code />} />
          <Route path='/forgetPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<Test />} />
          {
            decodeAuth && decodeAuth.userId ?
              <Route path='/' element={<AuthHome />} />
              : <Route path='/' element={<NonAuthHome />} />

          }
          {
            decodeAuth && decodeAuth.userId &&
            <Route path='/profile' element={<Profile />} />
          }
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
