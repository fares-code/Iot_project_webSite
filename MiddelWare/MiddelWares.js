import JWT from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
export  const IsSignin=async (req,res,next)=>{
    try {
        const decode =JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user= decode
   console.log(  req.user);
   
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({messange:"You are not sign in"})
        
    }
}









