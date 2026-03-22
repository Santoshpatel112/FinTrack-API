import mongoose  from "mongoose";


const CategorySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
        required :true
    },
    type :{
        type :String,
        enum :["income","expences"],
        required :true
    },
},
{timestamps:true})

export const Category=mongoose.model("Category",CategorySchema);