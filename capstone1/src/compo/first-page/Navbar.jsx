import React, { useEffect, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import {Search} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css'
import { fontSize } from '@mui/system';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../loginandsignup/global';
function Navbar() {
  const navigate=useNavigate()
    const logout=()=>{
        navigate('/')
        localStorage.removeItem("token")}
const [people,setpeople]=useState()
        const id=useParams()
        const nav=useNavigate()
        useEffect(()=>{
          console.log(id.id)

          const navuser=async()=>{
            console.log("navi")
            const user=await axios.get(`${API}/user/users/${id.id}`)
            // if(user.status===406)
            // {
            //   toast("Unauthorized activities detedted")
            //   localStorage.removeItem("token")
            //   nav('/user/login')
            // }
            setpeople(user.data)
            console.log(user)
            console.log("navigationnnnn")
          }
          navuser()
        },[id.id])
        // console.log(people)
          const navi=()=>{
    // navigate(`/profile/${id.id}`)
    console.log("first")
  }
  // console.log(people.profile)
  // console.log(people.profile)


  return (
    <>
    <nav class="navbar bg-body-tertiary">
    <div className="nav">
    <div class="left ">
    <a class="navbar-brand app-name">InfIChat</a>
    </div>
    <div className='center'>

    
   

    </div>
    {people ?
  <div className='right'>
    {/* <GroupsIcon className='group-icon'/> */}
   
<img clasName='pro-pic' src={people.profile? people.profile.myfile:'/images/person/2.jpg'} alt='name' onClick={navi}/>
  <LogoutIcon className='logout' onClick={logout}/>
  
  </div>
  :" "}
  </div>
</nav>

</>
  )
}

export default Navbar