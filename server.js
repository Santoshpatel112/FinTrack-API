import dotenv from "dotenv";
import express from 'express';
import ConnectDB from "./src/Config/db.js";
import authRoute from "./src/Routes/User.Routes.js";
// dotenv config
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


app.use("/api/auth",authRoute);

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`app is listening on ${PORT}`);
    });
});