import {client} from '../index.js'
import { ObjectId } from "mongodb";

export async function addnewuser(firstname,lastname,email,hashpassword) {
    return await client.db('chatting').collection('user').insertOne({ firstname:firstname,lastname:lastname,email: email, password: hashpassword,verified:false });
}

export async function getuser(email) {
    return await client.db('chatting').collection('user').findOne({ email: email });
}
export async function getuser1() {
    return await client.db('chatting').collection('user').find({ }).toArray();
}
export async function getuserbyid(id) {
    return await client.db('chatting').collection('user').findOne({_id:ObjectId(id)});
}
export async function updatepass(id,newpass) {
    console.log('password updTE')
    return client.db('chatting').collection('user').updateOne({_id:ObjectId(id)},{$set:{password:newpass,verfication:'changed'}});
}
export async function update_verification(id) {
    console.log('password updTE')
    return client.db('chatting').collection('user').updateOne({_id:ObjectId(id)},{$set:{verified:true}});

}
export async function otps(otps,id,token)
{return await client.db("chatting").collection('otps').insertOne({otps:otps,user_id:id,token:token})

}
export async function getotp(otp)
{
    return await client.db('chatting').collection('otps').findOne({otps:otp})
}
