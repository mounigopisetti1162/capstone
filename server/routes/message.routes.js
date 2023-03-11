import express from 'express'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken';
import { ObjectId } from "mongodb";
import * as dotenv from "dotenv"
import { mail,generatehashedpassword } from '../index.js';
import {addnewuser,getuser,getuser1, getuserbyid,updatepass,otps,getotp,update_verification,deleteotps} from '../services/user.services.js'
import randomstring from 'randomstring';
import { auth } from '../middleware/auth.js'; 
import { allconversation, conversation,message,idconversation,message_convo, allmessage, findconversation } from '../services/message.service.js';
const router=express.Router()

router.post('/',async function(req,res)
{
    const conversations=await conversation(req)
    console.log("conversation")
    console.log(conversations)

    res.send(conversations)

})

router.get('/',async function (req,res)
{
const all_convo=await allconversation()
res.send(all_convo)
})

router.get("/convo/:user_id",async function(req,res)
{
    try {
        console.log('pagessss')
        const conversations=await idconversation(req)
        res.send(conversations)
        
    }
    catch(err)
    {
res.send(err)
    }
})
router.get("/convo/:user_id/:another_id",async function(req,res)
{
    try {
        console.log('findconversation')
        const conversations=await findconversation(req)
        res.send(conversations)
        console.log(conversation)

        
    }
    catch(err)
    {
res.send({message:"empty"})
    }
})

router.post('/convo',async function (req,res)
{
    const newMessage=await message(req.body)
    res.send(newMessage)
})
router.get('/singlemsg/:conversationid',async function (req,res)
{
    try {
        console.log("hello this is that")
        const messages=await message_convo(req)
        console.log(messages)
        res.send(messages)
    } catch (error) {
        res.send(error)
        
    }
})
router.get('/conversations',async function(req,res)
{
    const message=await allmessage()
    res.send(message)
})



export default router;
