import React from 'react'
import axios from 'axios'
import { API } from '../loginandsignup/global'

export const signuppost=(data)=>
{
    return axios.post(`${API}/user/signup`,data)
     
}
export const getuserbyid=(id)=>{
    return axios.get(`${API}/user/users/${id}`)
}

export const getalluser_with_headers=(API)=>{
    return axios({method:"get",url:`${API}/user/users`,headers:{"token":localStorage.getItem("token")}})

}

export const conversation_frd_user=(id,pid)=>{

return axios({method:"get",url:`${API}/message/convo/${id}/${pid}`,headers:{"token":localStorage.getItem("token")}})
}

export const conversation_singlemsg_id=(currentchat)=>{
    return axios({method:"get",url:`${API}/message/singlemsg/${currentchat?._id}`,headers:{"token":localStorage.getItem("token")}})
}


export const conversation_id=(API,id)=>{

    return axios({method:"get",url:`${API}/message/convo/${id}`,headers:{"token":localStorage.getItem("token")}})
}

    export const getmessages=(members)=>{
    return axios.post(`${API}/message/`,members)
}

export const messagepost=(messagess)=>{
    return axios.post(`${API}/message/convo`,messagess)
}

export const resetpassword=(values)=>{
    return axios.post(`${API}/user/reset-password`,values)

}

  

