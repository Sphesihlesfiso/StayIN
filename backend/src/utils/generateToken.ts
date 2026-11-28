import jwt from "jsonwebtoken"
import { Response } from 'express';

export const generateJsontoken=(userId:number,res:Response):string =>{
    
        const token =jwt.sign({userId},process.env.JWT_SECRET!,{expiresIn:"7d"})
        if (!token){
            res.status(400).json({message:"Web token not created."})
        }else{
            res.cookie("jwt",token,{
                maxAge:7*24*60*60*1000,
                secure:true,
                sameSite:"none",
                httpOnly:process.env.NODE_ENV!=="development"

            })
            
        }
       
   
     return token;
    
}