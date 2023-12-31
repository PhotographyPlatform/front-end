import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NonAuthHome from '../NonAuthHome/NonAuthHome';
import Code from './signup/codes/Code';
import ForgotPassword from './forgetPass/Forget';
import ResetPassword from './forgetPass/ResetPass';
import SignUp from './signup/Signup';
import Signin from './signin/Signin';
import Header from '../../Header/Header';
import Search from '../Search';
import Home from '../Home/Home';
import Header_Inhansed from '../Header_Inhansed/Header_Inhansed';
function Container() {
  return (
    <div>
      <div>
        {/* <Header_Inhansed color={'#29383b'} bg={'white' }/> */}
        {/* <Header /> */}
        {/* <Header_Inhansed/> */}
        
        <Routes>
          <Route path='/ss' element={<Search />} />
          <Route path='/code' element={<Code />} />
          <Route path='/forgetPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default Container;
