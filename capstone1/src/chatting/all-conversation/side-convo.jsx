import React, { useEffect, useState } from 'react'
import './side-convo.css'
import axios from 'axios'
import { API } from '../../loginandsignup/global'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Convo({conversations,currentuser}) {
  const nav=useNavigate()
  const [user,setuser]=useState(null)
  useEffect(()=>{
    const frdid=conversations.members.find(m=>m!==currentuser.id)
    const getuser=async ()=>{
      const user=await axios.get(`${API}/user/users/${frdid}`)
      if(user.status===406)
      {
        toast("Unauthorized activities detedted")
        localStorage.removeItem("token")
        nav('/user/login')
      }
      setuser(user.data)
      // console.log(user.data)
    }
    getuser()
  },[])
 
  return (
    <div className='conversations'>
        <div className="conversation">
            <img className='convo-img' src={user?.profile ? user.profile.myfile: "/images/person/no-avatar.png"} alt="`src/no-avatar.png`"/>
            <span className="convo-text">{user?.firstname}</span>
        </div>
    </div>
  )
}


export default Convo