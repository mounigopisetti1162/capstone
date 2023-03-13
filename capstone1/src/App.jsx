import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Signup from './loginandsignup/signup';
import Login from './loginandsignup/Login';
import Resetpass from './loginandsignup/resetpassword';
import Email from './loginandsignup/email';
import Otpverification from './loginandsignup/otpverification';
import Home from './compo/first-page/home';
import ProtectedRoutes from './protected';
import 'bootstrap/dist/css/bootstrap.min.css'
import Conversation from './chatting/conversations';
import Profile from './profile/Profile';

function App() {
  const [count, setCount] = useState(0)
  const navigate=useNavigate()
  

  return (
    <div className="App">
      <ToastContainer/>

     {/* <Signup/> */}
     <Routes>
     <Route path='/'element={<Signup/>}/>
      <Route path='/user/login' element={ <Login/>}/>
      <Route path='/user/reset-password' element={<Resetpass/>}/>
      <Route path='/user/verification'element={<Email/>}/>
      <Route path='/mail-verification/:token' element={<Otpverification/>}/>
      <Route path='/home' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
      <Route path='/message/:id' element={<Conversation/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>

     </Routes>
    </div>
  )
}

export default App
