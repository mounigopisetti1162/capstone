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
import {io, Socket} from "socket.io-client"
import Allfrds from './frds/all-frds'

function Conversation() {
// const user=await
const id=useParams()
// console.log(id)
const [people,setpeople]=useState([])
const [conversations,setconversations]=useState([])
const [currentchat,setcurrentchat]=useState(null)
const [message,setmessage]=useState([])
const [newmessage,setnewmessage]=useState("")
const socket=useRef()
// const [socket,setsocket]=useState([])
const [arrival,setarrival]=useState(null)
const scrollref=useRef()


useEffect(()=>{
socket.current=io("ws://localhost:8900")

},[])

useEffect(()=>{
  console.log("get msg")
  socket.current.on("getmessage",(data)=>{
    setarrival({
      sender:data.senderid,
      text:data.text,
      // createdat:Date.now()
    })
  })
},[])
useEffect(()=>{
  arrival && currentchat?.members.includes(arrival.sender) && setmessage((prev)=>[...prev,arrival])

},[arrival,currentchat])
// console.log(arrival)



  useEffect(()=>{
 socket.current.emit("adduser",id.id)
//  socket.current.on("getuser",(users)=>{
//   // console.log(users)
//  })
  },[id.id])

  // useEffect(()=>{
  //   socket.on("welcome",message=>{
  //     console.log(message)
  //   })
  // },[socket])



useEffect(()=>{
  const getpeople=async ()=>{
    try {
      const users= await axios.get(`${API}/user/users`).then()
      // console.log("users")

      let array =[] ;
      users.data.forEach((e)=>array.push(e._id))
      console.log(array);
      
        // const {man}=users.data 
        console.log(users.data)
        console.log(id.id) 
      setpeople(users.data)
      
    } catch (error) {
      console.log(error)
    }
    // axios.get(`${API}/user/users`)
    // .then((res)=>console.log(res.data[0]._id))
    // .catch((err)=>console.log(err))
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
},[id.id])
// console.log(people)


useEffect(()=>{
  const getmessages=async()=>{
    const message=await axios.get(`${API}/message/singlemsg/${currentchat?._id}`)
    setmessage(message.data)
    // console.log("message")
  }
  getmessages()
},[currentchat,newmessage])



//scrool to do to the new convo
useEffect(()=>{
  scrollref.current?.scrollIntoView({behavior:"smooth"})
},[message])





const handelSubmit=async (e)=>{
  e.preventDefault();
  const messagess={
    conversation_id:currentchat._id,
    sender:id.id,
    text:newmessage
  }
  const receiverid=currentchat.members.find((member)=>member!==id.id);
  console.log(receiverid)

  socket.current.emit("sendmessage",{
    senderid:id.id,
    receiverid:receiverid,
    text:newmessage

  })

  if(newmessage!=="")
  {
  try {
    const res=await axios.post(`${API}/message/convo`,messagess)
    setmessage([...message,res.data])
    setnewmessage("")
  } catch (error) {
    console.log(error)
    
  }
}

}
// console.log()
// console.log("urrentchat)")

// console.log(currentchat._id)
// console.log(message)
console.log(currentchat)
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
            <button className='send-button' onClick={handelSubmit}>send</button>
           
          </div>
          </>
         : 
         <div className='no-chat'> <div className='chat-info'>Select your frds to start chat
         </div>
         <div>
         <img className='chat-image' src='/public/images/person/OIP.jpg'/>
         </div>  </div>}</div>

        </div>
        <div className="chat-right">
        <div className="chat-right-wrapper">
          <div className='titlefrds'>
            <div className='frd-title'>ALL FRDS</div>
            </div>
               
                <Allfrds people={people} id={id} setcurrentchat={setcurrentchat}/>
                
                 
          
        </div>

        </div>

    </div>
    </div>
    </>
  )
}

export default Conversation