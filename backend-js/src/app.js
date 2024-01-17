import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//import routes
import diseaseRouter from "./routes/disease.routes.js"
import doctorRouter from "./routes/doctor.routes.js"

app.use("/api/v1/user", diseaseRouter)
app.use("/api/v1/doctor", doctorRouter)


export {app}