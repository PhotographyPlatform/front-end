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

function Container() {
  return (
    <div>
      <div>
        <Header />
        <Routes>
          <Route path='/ss' element={<Search />} />
          <Route path='/code' element={<Code />} />
          <Route path='/forgetPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<Signin />} />

          <Route path='/' element={<NonAuthHome />} />
        </Routes>
      </div>
    </div>
  );
}

export default Container;
