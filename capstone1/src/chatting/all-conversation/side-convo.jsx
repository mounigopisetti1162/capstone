import React, { useEffect, useState } from 'react'
import './side-convo.css'
import axios from 'axios'
import { API } from '../../loginandsignup/global'
import { useNavigate } from 'react-router-dom'


function Convo({conversations,currentuser}) {
  const nav=useNavigate()
  const [user,setuser]=useState(null)
  useEffect(()=>{
    const frdid=conversations.members.find(m=>m!==currentuser.id)
    const getuser=async ()=>{
      const user=await axios({method:"get",url:`${API}/user/users/${frdid}`,headers:{"token":localStorage.getItem("token")}})
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
            <img className='convo-img' src={user?.profile ? user.profile.myfile: "/public/images/person/no-avatar.png"} alt="`src/no-avatar.png`"/>
            <span className="convo-text">{user?.firstname}</span>
        </div>
    </div>
  )
}


export default Convo