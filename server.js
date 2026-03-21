import dotenv from "dotenv";
import express from 'express';
import ConnectDB from "./src/Config/db.js";
import authRoute from "./src/Controllers/User.Controllers.js";
// dotenv config
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


app.use("/api/auth",authRoute);
app.listen(PORT, (req, res) => {
    console.log(`app is listening on ${PORT}`);
    ConnectDB();
});