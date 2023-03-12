import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../loginandsignup/global'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Allfrds({people,id,setcurrentchat}) {
  // console.log(people)
//   const [user,setuser]=useState(null)
//   useEffect(()=>{
//     const frdid=conversations.members.find(m=>m!==currentuser.id)
//     const getuser=async ()=>{
//       const user=await axios.get(`${API}/user/users/${frdid}`)
//       setuser(user.data)
//       // console.log(user.data)
//     }
//     getuser()
//   },[])
const nav=useNavigate()
const handelclick=async(people)=>{

console.log(id.id)
console.log(people._id)

const existing=await axios({method:"get",url:`${API}/message/convo/${id.id}/${people._id}`,headers:{"token":localStorage.getItem("token")}})
if(existing.data[0]!==undefined)
{
  setcurrentchat(existing.data[0])
  console.log(existing.data)
}
else{
const members={recid:id.id,senid:people._id}

const getconversation=async()=>
{
  try {
    const res=await axios.post(`${API}/message/`,members)
  

    const existing=await axios({method:"get",url:`${API}/message/convo/${id.id}/${people._id}`,headers:{"token":localStorage.getItem("token")}})
    if(res.response.status===406)
    {
      toast("Unauthorized activities detedted")
      localStorage.removeItem("token")
      nav('/user/login')
    }

    setcurrentchat(res.data)
    console.log(res)
  } catch (error) {
    
  }
}
getconversation()
}

}


  return (
    <div className='conversations'>
      {people.map((p,key)=>{
        if(p._id!==id.id)
        {key
          return(
        <div className="conversation" onClick={()=>handelclick(p)}>
         
            <img className='convo-img' src={p.profile?p.profile.myfile:"/images/person/no-avatar.png"} alt="`src/no-avatar.png`"/>
            <span className="convo-text">{p.firstname}</span>
        </div>
      )}
      }

      )

      }
    </div>
  )
}



export default Allfrds