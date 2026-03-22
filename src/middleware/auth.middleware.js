import jwt from "jsonwebtoken"

import { User } from "../Models/User.Model.js"

export const authMiddleware = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(404).json({
                susess: false,
                message: "token not found"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        
        const user = await User.findById(decode.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found in DB",
            });
        }
        req.user=user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}