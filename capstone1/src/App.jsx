import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Signup from './compo/signup';
import Login from './compo/Login';
import Resetpass from './compo/resetpassword';
import Email from './compo/email';
import Otpverification from './compo/otpverification';
import Home from './compo/Home';
import ProtectedRoutes from './protected';

function App() {
  const [count, setCount] = useState(0)
  const navigate=useNavigate()
  const logout=()=>{
    navigate('/')
    localStorage.removeItem("token")}

  return (
    <div className="App">
      <button onClick={logout}>logout</button>
      <ToastContainer/>

     {/* <Signup/> */}
     <Routes>
     <Route path='/'element={<Signup/>}/>
      <Route path='/user/login' element={ <Login/>}/>
      <Route path='/user/reset-password/:id' element={<Resetpass/>}/>
      <Route path='/user/verification'element={<Email/>}/>
      <Route path='/mail-verification/:token' element={<Otpverification/>}/>
      <Route path='/home' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>

     </Routes>
      
    </div>
  )
}

export default App
