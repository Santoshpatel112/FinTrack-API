import mongoose  from "mongoose";


const UserSchema=mongoose.Schema({
    fullname :{
        type:String,
    },
    email :{
        type:String,
        required :[true,"Email must be required"],
        unique :[true,"Email must be unique"]
    },
   mobNo: {
  type: String,
  required: true,
  unique: true
},
    password :{
        type :String,
        required:[true,"Password must be required"],
        minlength:6
    },
    role :{
        type :String,
        enum :["user","admin"],
        default :"user"
    }
},{
   timestamps: true
})

export const User=mongoose.model("User",UserSchema);