import React, { useContext, useEffect, useState } from 'react'
import FileBase64 from 'react-file-base64';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../loginandsignup/global';
function Profile() {
  const {id}=useParams()
  console.log(id)
  const [user,setuser]=useState()

  // const [iteam,setiteam]=useState({image:''})
  // context.getpeople(id.id)
  useEffect(()=>{
  const getpeople=async()=>{
    console.log("first")
    const user=await axios.get(`${API}/user/users/`)
    setuser(user.data)

 }
 
  getpeople()
 },[id])
  console.log(user)
  return (
    <div className='profile-page'>
      this is the page
      <div className='profile'>
        <div className='profile-right'>
          hello
          
{/* firstname
pokeamon

String
lastname
pokeamon

String
email
pikachu@gmail.com

String
password
$2b$10$/mivJ6b/MXPjINga2T/3wukuEHny/piKRuODvWJFeBx8Gdmu/.baS

String
verified
true

Boolean
profile

String
isAdmin
false

Boolean
createdAt
1678132198650

Double
city

String
discription */}

        {/* 
        </div>
        <div className="profile-center">
          {/* <span className='first-name'>First Name: <span>{user.firstname} </span> </span> */}

        </div>
      </div>

    </div>
  )
}

export default Profile