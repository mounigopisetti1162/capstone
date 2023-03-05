import express from 'express'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken';
import * as dotenv from "dotenv"
import { mail,generatehashedpassword } from '../index.js';
import {addnewuser,getuser,getuser1, getuserbyid,updatepass,otps,getotp,update_verification} from '../services/user.services.js'
import randomstring from 'randomstring';

const router=express.Router()
//  const otpverification=async({id,email})=>{
    
// //    res.send(otpsstore)

//  }
router.get('/signup',async function(request,responce)
{
    const user=await getuser1()
    responce.send(user)
})

router.post('/signup',async function(req,res)
{
    const {firstname,email,lastname,password,confrimpassword}=req.body;
    const found=await getuser(email)
    console.log(found)
    // if(found)
    // {
    //     console.log("not")
    //     res.status(401).send({message:"user alredy exist"})
    // }
    // else{
    const hashpassword=await generatehashedpassword(password)
    const hashpassword2=await generatehashedpassword(confrimpassword)
      //  db.movies.insertMany(data)
    //  
    const newuser = await addnewuser(firstname,lastname,email,hashpassword,hashpassword2,)
    
    const id=newuser.insertedId.toString()
    const otp=`${Math.floor(1000+Math.random()*9000)}`
    const token=randomstring.generate(15);
    const link=`${process.env.BASE_URL}/mail-verification/${token}`
  
       const verification_otp=`<p> enter the ${otp} in the app to do the verification process  enter in this ${link}</p>`
       // this objectid need to be chnaged from new ObjectId to general number
    await mail(email,'verification mail',verification_otp)
    const otpsstore=await otps(otp,id,token)
    // otpverification(id,email)
    console.log(newuser.insertedId.toString())
      res.send({message:"hai mounika"})
    // }
})
router.post('/otpverification',async function (request,responce)
{
    const {otp}=request.body
    const otp_found=await getotp(otp)
    console.log(otp_found)
    if(otp_found)
    {
        const name=await update_verification(otp_found.user_id)
        responce.send({message:'the verification is done'})
    }
    else{
        responce.send({message:'the otp is not valid'})
    }
})
router.post('/login',async function(request,responce)
{
    const {email,password}=request.body;
    const emailfound=await getuser(email)
    // console.log(emailfound.verified)

    if(!emailfound)
    {
        responce.send({message:'user not found'})
    }
    else if(!emailfound.verified){
        responce.status(402).send({message:'do the verification process'})

    }
    else{
        const pass=await bcrypt.compare(password,emailfound.password)
        console.log(pass)
        if(pass)
        {
            const token=jwt.sign({id:emailfound._id},process.env.SCRETE_TOKEN)
            responce.status(200).send({message:"logged in sucessfully",token:token})

        }
        else{
            responce.status(401).send({message:'invalid credentials'})
          }
    }
})


router.post('/forgotpass',async function(request,responce)
{
    console.log(request.body)
    const {email}=request.body
    const userfound=await getuser(email)
    // responce.send({monika:"very very inteligent girl"})
    if(!userfound)
    {
        responce.send({message:'this user is not found'})
    }
    else{
        console.log("found")
        const token=jwt.sign({id:userfound._id},process.env.SCRETE,{expiresIn:'15m'})
        const link=`${process.env.BASE_URL}/user/reset-password/${userfound._id}`
        await mail(userfound.email,'verification mail',link)
        console.log(link)
        responce.send({message:"password rest link ui ssent to mail"}) 
    }
})

router.get(`/reset-password/:id`,async function(request,responce)
{
    const {id}=request.params
    console.log(id)
    const useridfound=await getuserbyid(id)
    if(!useridfound)
    {
        responce.send({message:"this link is not for valid person"})
    }
    else{

responce.send({message:'we will reset the password'})
 
    }
})

router.post(`/reset-password`,async function(request,responce)
{
    const {email,password}=request.body
    const userfound=await getuser(email)
    console.log("dataaa")
    console.log(password)
        const newpass=await generatehashedpassword(password)
        const newpassword=await updatepass(userfound._id,newpass)
        console.log(newpass)
        responce.send(newpassword)
        console.log("newpassword")

})


export default router;