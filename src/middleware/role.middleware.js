import { Suspense } from "react";
import { User } from "../Models/User.Model";

export const Authrizerole=(...role)=>{
    return (req,res,next)=>{
        if(!User){
            return res.staus(404).json({
                Susess :false,
                message :'user not found'
            })
        }
        if(!role.includes(req.User.role)){
            return res.staus(403).json({
                sucess :false,
                message :"Acess Deniad"
            });
        }
        next();
    };
};