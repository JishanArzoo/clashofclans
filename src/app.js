import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import announcementRouter from "./routes/announcement.routes.js"
import helmet from "helmet"
import miscRouter from "../src/routes/misc.routes.js"




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

app.use("/api/v1/users", userRouter)
app.use("/api/v1/announcements", announcementRouter )
app.use("/api/v1/misc", miscRouter)


export {app}