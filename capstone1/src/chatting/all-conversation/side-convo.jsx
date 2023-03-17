import React, { useEffect, useState } from 'react'
import './side-convo.css'
import axios from 'axios'
import { API } from '../../loginandsignup/global'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { getuserbyid } from '../../axios/axios'

function Convo({conversations,currentuser}) {
  const nav=useNavigate()
  const [user,setuser]=useState(null)
  useEffect(()=>{
    const frdid=conversations.members.find(m=>m!==currentuser.id)
    const getuser=async ()=>{
      // console.log("sideconvoo")
      //axios calling

      const user= await getuserbyid(frdid)
      // await axios.get(`${API}/user/users/${frdid}`)
      setuser(user.data)
      
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