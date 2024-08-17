import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try {
       const connectionInstance = mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
    //    console.log((await connectionInstance).connection.host)
        
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}