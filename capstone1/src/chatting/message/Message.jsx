import React, { useEffect, useState } from 'react'
import { API } from '../../loginandsignup/global'

import './Message.css'
import axios from 'axios'
function Message({message,own,recevier,sender}) {
  const [friend,setfriend]=useState("")

useEffect(()=>
{


  const frduser=async ()=>{
    // console.log("first")
    const frd= await axios.get(`${API}/user/users/${sender}`)
    setfriend(frd.data)
    // console.log(frd.data)
  }
  frduser()
},[sender,recevier])


  return (
    <>
    <div className={own ? "message own":'message'}>
    <div className='message-top'>
      {own ?
      <img className='message-pic'src={friend.profile?friend.profile.myfile:'/images/person/2.jpg'} alt='name'/>
      : 
      <img className='message-pic'src={recevier.profile?recevier.profile.myfile:'/images/person/1.jpg'} alt='name'/>
    
    }
<p className='message-text'>{message.text}  </p> </div>
    <div className="message-bottom">

    </div>
    </div>
    </>
  )
}

export default Message