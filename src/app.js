import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import helmet from "helmet"




const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())

app.get("/", (req, res) => {
    res.status(200).json({"message" : "This is root API endpoint"})
})





//Routes Declaration

app.use("api/v1/users", userRouter)


export {app}