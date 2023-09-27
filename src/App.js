import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SignUp from './components/Pages/auth/signup/Signup';
import Code from './components/Pages/auth/signup/codes/Code';
import Signin from './components/Pages/auth/signin/Signin';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/code' element={<Code />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
