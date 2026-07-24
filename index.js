import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js";

dotenv.config({});

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "I am from backend",
        success: true
    })
})

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOption))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    connectDb();
    console.log(`Server running at port ${PORT}`);
    
})