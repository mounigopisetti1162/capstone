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
const [leftstatus,setleftstatus]=useState('left')
const [right,setrigthstatus]=useState('right')
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
socket.current=io("https://scoket-api.onrender.com/", 
// socket.current=io("http://localhost:8901", 

{
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
})
// socket.current=io("http://localhost:8900")
console.log("scoket connection")

},[])

useEffect(()=>{
  console.log("get msg")
  socket.current.on("getmessage",(data)=>{
    setarrival({
      sender:data.senderid,
      text:data.text,
      // createdat:Date.now()
    })
    console.log("the data")
  })
},[])
useEffect(()=>{
  arrival && currentchat?.members.includes(arrival.sender) && setmessage((prev)=>[...prev,arrival])

},[arrival,currentchat])
// console.log(arrival)



  useEffect(()=>{
 socket.current.emit("adduser",id.id)
 console.log("this is sockent")
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
   console.log("second")
      await axios({method:"get",url:`${API}/user/users`,headers:{"token":localStorage.getItem("token")}}).then((data)=>
      {
        
        let array =[] ;
        data.data.forEach((e)=>array.push(e._id))
        console.log(array);
        
          // const {man}=users.data 
          // console.log(users.data)
          // console.log(id.id) 
        setpeople(data.data)
        
      }).catch ((error)=>{

        console.log(error)
                if(error.message==="Request failed with status code 406")
                {
                  toast("Unauthorized activities detedted")
                  localStorage.removeItem("token")
                  nav('/user/login')
                }
      })
      
      
        
      
  
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
    const message=await axios({method:"get",url:`${API}/message/singlemsg/${currentchat?._id}`,headers:{"token":localStorage.getItem("token")}})
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
      <div className="chat-t">
      <div className='chat-top'>
    <span className='emojies'> <img className="img1" src='https://i.pinimg.com/originals/7a/96/2f/7a962f85271b11310d961b24b28148c1.gif'/>
<img className="img1" src='https://static.vecteezy.com/system/resources/previews/004/852/438/original/emoji-couple-valentine-concept-design-3d-inlove-emojis-character-with-flower-bouquet-for-valentine-and-anniversary-celebration-emoticons-illustration-vector.jpg'/>
<img className="img1" src='https://pic.funnygifsbox.com/uploads/2020/05/funnygifsbox.com-2020-05-04-13-06-08-82.gif'/>
<img className="img1" src='https://i.pinimg.com/originals/aa/f7/f2/aaf7f2bb862a0004acad5bff2b08d927.gif'/>
<img className="img1" src='https://get-talking-smileys.com/wp-content/uploads/2018/12/sticker.gif'/>
</span>
</div>
<div className='chat-b'>
        <div className="chat-left">
            <div className="chat-left-wrapper">
                {/* <input className='frds-search' placeholder='search frds'onChange={handleChange}
   value={searchInput}/> */}
   {/* <SearchBar/> */}
   <p className='left-heading'>CHATS</p>

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
    </div>
    </div>
    </>
  )
}

export default Conversation