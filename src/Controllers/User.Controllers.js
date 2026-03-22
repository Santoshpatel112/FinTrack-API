import jwt from "jsonwebtoken";
import { User } from "../Models/User.Model.js";
import bcrypt from "bcryptjs";

export const Register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    const mobNo = req.body.mobNo || req.body.mobNO;

    if (!fullname || !email || !password || !mobNo) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobNo }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      mobNo,
      password: hashedPassword,
      role: role || "user",
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userResponse,
    });

  } catch (error) {
    console.error("Register Error:", error); // 🔥 IMPORTANT

    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};


export const LoginUser=async (req,res)=>{
    try {
        const { password, email, mobNo} = req.body;

        if (!password || (!email )) {
            return res.status(400).json({
                message :"All fields must be requird",
                sucess:false
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
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

        const token = await jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, { httpOnly: true });
        const userResponce = user.toObject();
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
export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Logout Error", error);

    return res.status(500).json({
      message: "Logout Error",
      success: false,
    });
  }
};
export const getprofil=async (req,res)=>{
    try {
        const user=req.user;
        
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
    } catch (error) {
        console.log("Get profile Error", error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

export const getAllUser=async(req,res)=>{
    try {
        const user = await User.find().select("-password");
        if (user.length === 0) {
            return res.status(400).json({
                message :"No User found",
                sucess :false
            })
        }
        return res.status(201).json({
            message :"User Found Sucessfully",
            sucess:true,
            count :user.length,
            User:user
        })
    } catch (error) {
        console.log("User Not found",error);
        return res.status(500).json({
            message :"Server error",
            sucess:false
        })
    }
}