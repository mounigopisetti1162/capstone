import  jwt  from "jsonwebtoken";
 export const auth=(request,responce,next)=>
 {
    try {
        const token=request.header("token")
        jwt.verify(token,process.env.SCRETE_TOKEN)
        next()
    } catch (err) {
        responce.status(401).send({message:err.message})
        
    }
 }