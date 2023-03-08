import React, { useContext, useEffect, useRef } from 'react'
import Navbar from '../compo/first-page/Navbar'
import Convo from './all-conversation/side-convo'
import './conversations.css'
import Message from './message/Message'
import SendIcon from '@mui/icons-material/Send';
import { LineAxisOutlined } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { API } from '../loginandsignup/global'

function Conversation() {
// const user=await
const id=useParams()
// console.log(id)
const [people,setpeople]=useState([])
const [conversations,setconversations]=useState([])
const [currentchat,setcurrentchat]=useState(null)
const [message,setmessage]=useState([])
const [newmessage,setnewmessage]=useState("")
const scrollref=useRef()
useEffect(()=>{
  const getpeople=async ()=>{
    try {
      const users= await axios.get(`${API}/user/users`)
      // console.log("users")
      setpeople(users.data)
      
    } catch (error) {
      console.log(error)
    }
  }
  const getconversations=async ()=>{

    const conversation=await axios.get(`${API}/message/convo/${id.id}`)
    // console.log(conversation.data)
    setconversations(conversation.data)
    // console.log("first")
    // console.log(id.id)
  }
  
    getpeople()
    getconversations()
},[id])

useEffect(()=>{
  const getmessages=async()=>{
    const message=await axios.get(`${API}/message/singlemsg/${currentchat?._id}`)
    setmessage(message.data)
    // console.log("message")
  }
  getmessages()
},[currentchat,message])
//scrool to do to the new convo
useEffect(()=>{
  scrollref.current?.scrollIntoView({behavior:"smooth"})
})


const handelSubmit=async (e)=>{
  e.preventDefault();
  const messagess={
    conversation_id:currentchat._id,
    sender:id.id,
    text:newmessage
  }
  try {
    const res=await axios.post(`${API}/message/convo`,messagess)
    setmessage([...message,res.data])
    setnewmessage("")
  } catch (error) {
    console.log(error)
    
  }

}
// console.log()
// console.log("urrentchat)")

// console.log(currentchat._id)
// console.log(message)
  return (
    <>
    <Navbar/>
    <div className='chat'>
    <div className='chatting'>
        <div className="chat-left">
            <div className="chat-left-wrapper">
                <input className='frds-search' placeholder='search frds'/>
                {conversations.map((C)=>(
                <div onClick={()=>setcurrentchat(C)}>
                <Convo conversations={C} currentuser={id}/>
                 </div>
                ))}
            </div>

        </div>
        <div className="chat-center">
        <div className="chat-center-wrapper">
          {currentchat ?
          <>
          <div className='chatbox-top'>
            {
              message.map((m)=>(
                <div ref={scrollref}>

                <Message message={m} own={m.sender===id.id}/>
              </div>
              ))
            }

          </div>
          <div className='chatbox-bottom'>
            <textarea placeholder='enter text' className='message-input' onChange={(e)=>setnewmessage(e.target.value)} value={newmessage}>

            </textarea>
            <SendIcon className='send-button' onClick={handelSubmit}/>
          </div>
          </>
         : <span className='chat-info'>Select your frds to start chat
         <img className='chat-image' src='/public/images/person/OIP.jpg'/></span>}</div>

        </div>
        <div className="chat-right">
        <div className="chat-right-wrapper">
          
        </div>

        </div>

    </div>
    </div>
    </>
  )
}

export default Conversation