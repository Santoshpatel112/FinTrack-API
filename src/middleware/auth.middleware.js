import jwt from "jsonwebtoken"

import { User } from "../Models/User.Model"

export const authMiddleware=async (req ,res ,next)=>{
    try {
        const token=await headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(404).json({
                susess :false,
                message :"token not found"
            })
        }

        const decode=jwt.verify(token,process.env.JWT_SECRET);

        req.user=await User.findById(decode.id).select("password");
    } catch (error) {
        return res.status(401).json({
            message :"Invalid Token"
        })
    }
}