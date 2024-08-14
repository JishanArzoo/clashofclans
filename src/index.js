import { app } from "./app.js";
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";

dotenv.config({
    path: "./.env"
})
connectDB()
.then(() => {

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Your server is up and running at port ${process.env.PORT}`)
    })
}
)
.catch((e) => {
    console.log(e.message)
})