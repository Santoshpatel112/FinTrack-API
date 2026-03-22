import { User } from "../Models/User.Model";

import { Transction } from "../Models/Transction.Model";
import { use } from "react";
import mongoose from "mongoose";

export const createTransction=async (req,res)=>{
    try {
        const user=req.user
        if(!user){
            return res.status(400).json({
                message :"user does't Exit"
            })
        }
        const {type,category,paymentmethod,amount}=req.body;
        if(!user||!category||!paymentmethod || !amount){
            return res.status(400).json({
                message :"All field Must be required"
            })
        }

        const exitingTransction=await Transction.findOne({ $or:[{userId},{amount},{date},{category}]});
        if(exitingTransction){
            return res.status(404).json({
                message :"transiction Already Exit",
                sucess :false
            })
        }

        const newTransction= await Transction.create({
            userId,
            amount,
            category,
            date
        })
        return res.status(201).json({
            message :"Transction Created Sucessfully",
            sucess:true,
            data:newTransction
        }) 
    } catch (error) {
        console.log("Error in creating in Transction",error);
        return res.status(500).json({
            message :"Server Error"
        })
    }
}

export const GetAllTransction=async (req,res)=>{
    try {
        const user=req.user;
        if(!user){
            return res.status(404).json({
                message :"User not found",
                sucess:false
            })
        }
        const transiction=await Transction.find();
        if(!transiction){
            return res.status(404).json({
                message :"Transction Not found",
                sucess :false
            })
        }
        return res.status(201).json({
            message :"Get All transction Sucessfully",
            sucess :true,
            data :transiction
        })
    } catch (error) {
        console.log("Error Get all Transction",error);
        return res.status(500).json({
            message :"Server Error in Get all Transction",
            sucess:false
        })
    }
}



export const GetTransctionById=async (req,res)=>{
    try {
        const user =req.user;
        if(!user){
            return res.status(404).json({
                message :"User not found UnAutherized" ,
                sucess:false
            })
        }

        const transctionId=req.params.id;
        if(!transctionId){
            return res.status(404).json({
                message :"TransctionID Not Found",
                sucess:false
            })
        }
        
        // valid
        if(!mongoose.Types.ObjectId.isValid(transctionId)){
            return res.status(404).json({
                message :"Invalid Transction Id"
            })
        }
        const transction=await Transction.findOne({
            _id :transctionId,
            userId:user._id
        }).populate("category")
        if(!transction){
            return res.status(404).json({
                message :"transction Not found",
                sucess:false
            })
        }

        

        return res.status(200).json({
            message :'Get Transction By id Sucessfully',
            sucess:true
        })
    } catch (error) {
        console.log("Server Errro in getTransction By Id",error);
        return res.status(500).json({
            message :"Server error gettransction by Id",
            sucess:false
        })
    }
}


export const UpdateTransctionById=async (req,res)=>{
    try {
        const  user=req.user;
        if(!user){
            return res.status(404).json({
                message :"User not found",
                sucess:false
            })
        }
        const transctionId=req.params.id;
        if(!transctionId){
            return res.status(404).json({
                message :"TransctionId not found",
                sucess:false
            })
        }
        if(!mongoose.types.ObjectId.isValid(transctionId)){
            return res.status(400).json({
                message :"Innvalid Token ",
                sucess:false
            })
        }
        const transction=await Transction.findOne({
            _id:transctionId,
            userId :user._id
        }).populate("category");

        if(!transction){
            return res.status(404).json({
                message :"Transction Not found"
            })
        }

        const {amount ,category,paymentmethod,note}=req.body;
        if (amount !== undefined) transaction.amount = amount;
        if (category) transaction.category = category;
        if (paymentmethod) transaction.paymentmethod = paymentmethod;
        if (note) transaction.note = note;

        await transction.save();

        return res.status(200).json({
            message :"Transction Updated Sucessfully",
            sucess:true,
            data:transction
        })
    } catch (error) {
        console.log("Error Updateding TransctionBy Id",error);
        return res.status(500).json({
            message :"Server Error UpdateTrasctionById",
            sucess:false
        })
    }
}


export const DeleteTransctionById=async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}