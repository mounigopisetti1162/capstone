import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './compo/signup';
import Login from './compo/login';
import Resetpass from './compo/resetpassword';
import Email from './compo/email';
import Otpverification from './compo/otpverification';
import Home from './compo/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ToastContainer/>

     {/* <Signup/> */}
     <Routes>
     <Route path='/'element={<Signup/>}/>
      <Route path='/user/login' element={<Login/>}/>
      <Route path='/user/reset-password/:id' element={<Resetpass/>}/>
      <Route path='/user/verification'element={<Email/>}/>
      <Route path='/mail-verification/:token' element={<Otpverification/>}/>
<Route path='/home' element={<Home/>}/>

     </Routes>
      
    </div>
  )
}

export default App
