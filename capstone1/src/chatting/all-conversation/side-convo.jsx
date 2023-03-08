import React, { useEffect, useState } from 'react'
import './side-convo.css'
import axios from 'axios'
import { API } from '../../loginandsignup/global'


function Convo({conversations,currentuser}) {
  const [user,setuser]=useState(null)
  useEffect(()=>{
    const frdid=conversations.members.find(m=>m!==currentuser.id)
    const getuser=async ()=>{
      const user=await axios.get(`${API}/user/users/${frdid}`)
      setuser(user.data)
      // console.log(user.data)
    }
    getuser()
  },[])
 
  return (
    <div className='conversations'>
        <div className="conversation">
            <img className='convo-img' src={user?.profile ? user.profile: "/public/images/person/no-avatar.png"} alt="`src/no-avatar.png`"/>
            <span className="convo-text">{user?.firstname}</span>
        </div>
    </div>
  )
}


export default Convo