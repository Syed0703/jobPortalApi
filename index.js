import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.routes.js"
import applicationRoute from "./routes/application.route.js"

dotenv.config({});

const app = express();

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

// Api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
    connectDb();
    console.log(`Server running at port ${PORT}`);
    
})