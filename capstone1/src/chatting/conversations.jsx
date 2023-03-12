import React, { useContext, useEffect, useRef } from 'react'
import Navbar from '../compo/first-page/Navbar'
import Convo from './all-conversation/side-convo'
import './conversations.css'
import Message from './message/Message'
import SendIcon from '@mui/icons-material/Send';
import { LineAxisOutlined } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { API } from '../loginandsignup/global'
import {io, Socket} from "socket.io-client"
import Allfrds from './frds/all-frds'
// import SearchBar from './Searchbar'

function Conversation() {
// const user=await
const id=useParams()
// console.log(id)
const [people,setpeople]=useState([])
const [frduserpeo,setfrduserpeo]=useState([])
const [conversations,setconversations]=useState([])
const [currentchat,setcurrentchat]=useState(null)
const [message,setmessage]=useState([])
const [newmessage,setnewmessage]=useState("")
const socket=useRef()
const nav=useNavigate()
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
   
      const users= await axios.get(`${API}/user/users`)
     
      // console.log("users")

      let array =[] ;
      users.data.forEach((e)=>array.push(e._id))
      // console.log(array);
      
        // const {man}=users.data 
        // console.log(users.data)
        // console.log(id.id) 
      setpeople(users.data)
      
  
      // console.log(error.message)
    //   if(error.message==="Request failed with status code 406")
    //   {
    //     toast("Unauthorized activities detedted")
    //     localStorage.removeItem("token")
    //     nav('/user/login')
    //   }
    // }
    // axios.get(`${API}/user/users`)
    // .then((res)=>console.log(res.data[0]._id))
    // .catch((err)=>console.log(err))
  }



  const getconversations=async ()=>{

    const conversation=await axios({method:"get",url:`${API}/message/convo/${id.id}`,headers:{"token":localStorage.getItem("token")}})
    // console.log(conversation.data)
    // console.log(conversation.status)
    // if(conversation.status===406)
    // {
    //   toast("Unauthorized activities detedted")
    //   localStorage.removeItem("token")
    //   nav('/user/login')
    // }
    setconversations(conversation.data)
    // console.log("first")
    // console.log(id.id)
  }
    
//   }
  
    getpeople()
    getconversations()
    // frduser(id,currentchat)
},[id.id])
// console.log(people)
const[friendname,setfriendname]=useState("")
const[idfrd,setidfrd]=useState("")
useEffect(()=>
{

  const frduser=async ()=>{
    console.log("hello")
    console.log(currentchat)
    const receiverid=currentchat.members.find((member)=>member!==id.id);
    console.log(receiverid)
    try {
      
      const frd=await axios.get(`${API}/user/users/${receiverid}`)
          setfrduserpeo(frd.data)
          setfriendname(frd.data.firstname)
          console.log(frd.data.firstname)
    console.log("frd")
    const idfrd=await axios.get(`${API}/user/users/${id.id}`)
    setidfrd(idfrd.data)

    } catch (error) {
      console.log(error)
      
    }
}
frduser()
},[currentchat])
// console.log("first")
// console.log(idfrd)
// console.log("second")
// console.log(frduserpeo)
useEffect(()=>{
  const getmessages=async()=>{
    console.log("first")
    console.log(localStorage.getItem("token"))
    const message=await axios({method:"get",url:`${API}/message/singlemsg/${currentchat?._id}`,headers:{token:localStorage.getItem("token")}})
    // if(message.status===406)
    // {
    //   toast("Unauthorized activities detedted")
    //   localStorage.removeItem("token")
    //   nav('/user/login')
    // }
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



// console.log(receiverid)
// console.log()
// console.log("urrentchat)")

// console.log(currentchat._id)
// console.log(message)
// console.log(currentchat)



  return (
    <>
    <Navbar/>
    <div className='chat'>
    <div className='chatting'>
        <div className="chat-left">
            <div className="chat-left-wrapper">
                {/* <input className='frds-search' placeholder='search frds'onChange={handleChange}
   value={searchInput}/> */}
   {/* <SearchBar/> */}

                {conversations.map((C)=>(
                <div onClick={()=>setcurrentchat(C)}>
                <Convo conversations={C} currentuser={id}/>
                 </div>
                ))}
            </div>

        </div>
        <div className="chat-center">
          {/* {frduser(id)} */}

        <div className="chat-center-wrapper">
          {currentchat ?
          <>
          <div className="friendnames">
            <img className='message-pic' src={frduserpeo.profile? frduserpeo.profile.myfile:'/images/person/2.jpg'} alt=''/>
          <div className="friendname">
          {friendname}
          </div>
          </div>
          
         
          {/* {receiverid()} */}
          <div className='chatbox-top'>
            
            {
              message.map((m)=>(
                <div ref={scrollref}>

                <Message message={m} own={m.sender===id.id} recevier={frduserpeo} sender={id.id}/>
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
         <img className='chat-image' src='/images/person/OIP.jpg'/>
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