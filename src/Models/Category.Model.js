import mongoose  from "mongoose";


const Category=new mongoose.Schema({
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
    

})