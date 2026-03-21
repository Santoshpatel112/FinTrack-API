import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL; 
        if (!MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }
        await mongoose.connect(MONGO_URL);
        console.log("Mongo database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); 
    }
};

export default ConnectDB;