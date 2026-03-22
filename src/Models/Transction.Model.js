import mongoose  from "mongoose";

const TransctionSchema=new mongoose.Schema({
    userId :{
        type :mongoose.Schema.Types.ObjectId,
        ref :"User",
        required : true
    },
    amount :{
        type :Number,
        required:true
    },
    type :{
        type :String,
        enum :["amount","expences"]
    },
    note:{
        type :String
    },
    category :{
        type:mongoose.Schema.Types.ObjectId,
        ref :"Category",
        required:true
    },
    paymentmethod:{
        type :String,
        enum:["card","upi","cash","bank"],
        required:true
    },
    status :{
        type :String,
        enum :["pending","completed"],
        default :"pending"
    },
    date :{
        type :Date,
        default :Date.now()
    },
    createdAt :{
        type :String,
        date :Date.now()
    },
    updatedAt :{
        type :String,
        date :Date.now()
    }
},{
    timestamps:true
})

export const Transction=mongoose.model("Transction",TransctionSchema);