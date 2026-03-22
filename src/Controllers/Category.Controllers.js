import { Category } from "../Models/Category.Model";
import { Transction } from "../Models/Transction.Model.js";

export const createCategory=async (req,res)=>{
    try {
        const {name,type}=req.body;
        const userId=req.user._id;
        if(!name || !type){
            return res.status(404).json({
                message :"All Field Must be required",
                sucess :false
            })
        }
        const exitingcategory=Category.find({
            userId,
            type,
            name

        })
        if(exitingcategory){
            return res.status(404).json({
                message :"Category Alredy Exit",
                sucess:false
            })
        }

        const category=Category.create({
            name,
            type,
            userId,
            isdefault:false
        })

        return res.status(201).json({
            message :"Category Created Sucessfully",
            sucess:true,
            category
        })
    } catch (error) {
        console.log("Create Category Errro",error);
        return res.status(404).json({
            message :"Server Error in Createting Category",
            sucess :false
        })
    }
}

export const GetCategory=async (req,res)=>{
    try {
        const user= req.user._id;
        if(!user){
            return res.status(400).json({
                message :"user Not Found",
                sucess:false
            })
        }

        const category=Category.find({
            $or:[{
                userId,
                isdefault :true
            }]
        })
        return res.status(201).json({
            message :"Get category Sucessfully",
            sucess:true,
            count:(await category).length,
            data :category
        })
    } catch (error) {
        console.log("Server Error In Getcategory",error);
        return res.status(500).json({
            message :"Server Error GetCategory",
            sucess:false
        })
    }
}