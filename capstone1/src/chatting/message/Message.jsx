import React, { useEffect, useState } from 'react'
import { API } from '../../loginandsignup/global'

import './Message.css'
import axios from 'axios'
function Message({message,own,recevier,sender}) {
  // const [sender,setsender]=useState("")
  const [friend,setfriend]=useState("")
  
  //  setfriend(message.sender)
  //  console.log(message)
  
  // console.log(friend)
  // console.log(own)

//   if(message)
//   {console.log(message.sender)
useEffect(()=>
{


  const frduser=async ()=>{
    console.log("first")
    const frd=await axios.get(`${API}/user/users/${sender}`)
    setfriend(frd.data)
    // console.log(frd.data)
  }
  frduser()
},[sender,recevier])

// console.log(friend)
// /public/images/person/no-avatar.png'
// console.log(recevier)
  return (
    <>
    <div className={own ? "message own":'message'}>
    <div className='message-top'>
<img className='message-pic'src={ own?sender.profile?sender.profile.myfile:'/images/person/2.jpg':recevier.profile?recevier.profile.myfile:'/images/person/1.jpg'} alt='name'/>
<p className='message-text'>{message.text}  </p> </div>
    <div className="message-bottom">

    </div>
    </div>
    </>
  )
}

export default Message