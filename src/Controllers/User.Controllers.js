import { User } from "../Models/User.Model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { use } from "react";
export const Register=async(req,res)=>{
    
    try {
        const {fullname ,email,password,mobNO}=req.body;
        if(! fullname || !email||!password|| !mobNO){
        return res.status(400).json({
            message :"All Fields Must Required",
        })
    }

    const exitinguser=await User.findOne({$or:[{email},{mobNO}]});
    if(exitinguser){
        return res.status(409).json({
            message :"User alredy Exit this email and mob"
        })
    }
    const haspassword=await bcrypt.hash(password,10);
    const newuser=await User.create({
        fullname,
        email,
        mobNO,
        password :haspassword
    })
    const userResponce=user.toObject();
        delete userResponce.password;
    return res.status(201).json({
        message:"User Created Sucessfully",
        newuser,
        data :userResponce,
        sucess :true
    })
    } catch (error) {
        console.log("Resiter Error",error);

        return res.status(500).json({
            message :"server Error",
            sucess :false
        })
    }
}


export const LoginUser=async (req,res)=>{
    try {
        const {password ,email}=rec.body;
        if(!password || email){
            return res.status(400).json({
                message :"All fields must be requird",
                sucess:false
            })
        }
        const user=await User.findOne({$or:[{email},{mobNO}]});
        if(!user){
            return res.status(409).json({
                message :"User does't exit",
                sucess :false
            })
        }

        const ismatch= await bcrypt.compare(password,user.password);
        if(! ismatch){
            return res.status(404).json({
                message :"Password Does't Match",
                sucess :false
            })
        }

        const token=await jwt.sign(
            {
                id :user_.id,
                role:user.role
            },
            {expiresIn :"7d"}
        )

        req.cookies(token);
        const userResponce=user.toObject();
        delete userResponce.password;

        return res.status(201).json({
            sucess :true,
            message :"Login Sucessfully",
            token,
            data :userResponce
        })

    } catch (error) {
        console.log("Error in Login",error);

        return res.status(500).json({
            sucess :false,
            message :"server error",
        });
    }
}