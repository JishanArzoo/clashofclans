import mongoose from "mongoose";
import { Schema } from "mongoose";

const announcementSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    announcement: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true})

export const Announcement = mongoose.model("Announcement", announcementSchema);