import  express, { text } from "express";
import {  MongoClient, ObjectId } from "mongodb";
import cors from 'cors'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer'
import userRouter from './routes/user.route.js'
import profileRouter from './routes/profile.routes.js'
import messageRouter from './routes/message.routes.js'
export const app=express()
dotenv.config() 

const PORT=process.env.PORT||4000
const MONGO_URL=process.env.MONGO_URL
const client=new MongoClient(MONGO_URL)
await client.connect()
console.log("monggo connected")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use('/user',userRouter)
app.use('/profile',profileRouter)
app.use('/message',messageRouter)

// export async function sendotp()
// {
//     try{
//         const otp=`${Math.floor(1000+Math.random()*9000)}`
//     }
//     catch{
        
//     }
// }
 export async function mail(email,subject,text)
{
    try {
let mailtransporter=nodemailer.createTransport({
    host:process.env.HOST,
    service:process.env.SERVICE,
    port:Number(process.env.EMAIL_PORT),
    secure:Boolean(process.env.SECURE),
    
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        }
    })
    await mailtransporter.sendMail({
        from:process.env.USER,
        to:email,
        subject:subject,
        text:text
    })
    console.log("email sent sucessfully")
    } catch (error) {
        console.log("the mail is not sent",error)
    }
}
   



export async function generatehashedpassword(password){
    const no_of_rounds=10;
    const salt=await bcrypt.genSalt(no_of_rounds)
    const hashedpassword=await bcrypt.hash(password,salt)
    return hashedpassword
}  
app.get('/',function(request,responce)
{
    responce.send("this is the chatting app page")
})


app.listen(PORT,()=>console.log(`server ${PORT}`))
export {client}