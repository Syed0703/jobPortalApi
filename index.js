import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.routes.js"
import applicationRoute from "./routes/application.route.js"
import dns from 'node:dns';


// Only override DNS when running on your local machine
if (process.env.NODE_ENV !== 'production') {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

dotenv.config({});

const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const corsOption = {
    origin: 'https://careerhub-lac.vercel.app',
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