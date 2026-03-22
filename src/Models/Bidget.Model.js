import mongoose from "mongoose";

const BidgetSchema=new mongoose.Schema({
    userId:{
        type :mongoose.Schema.Types.ObjectId,
        ref :"User",
        required :true
    },

    amount :{
        type :Number,
        required:true
    },
    Month:{
        type:Number
    },
    Year:{
        type:Number
    },
    Spent:{
        type:Number,
        required :true
    },
    Remeaning :{
        type :Number,
        required:true
    },
    createdAt:{
        type :Date,
        default :Date.now()
    },
    updatedAt:{
        type :Date,
        default :Date.now()
    }
})

export const Budget=mongoose.model("Budget",BidgetSchema);