import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../loginandsignup/global'


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
const handelclick=async(people)=>{

console.log(id.id)
console.log(people._id)

const existing=await axios.get(`${API}/message/convo/${id.id}/${people._id}`)
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

    const existing=await axios.get(`${API}/message/convo/${id.id}/${people._id}`)

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
      {people.map((p)=>{
        if(p._id!==id.id)
        {
          return(
        <div className="conversation" onClick={()=>handelclick(p)}>
         
            <img className='convo-img' src={p.profile?p.profile:"/public/images/person/no-avatar.png"} alt="`src/no-avatar.png`"/>
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