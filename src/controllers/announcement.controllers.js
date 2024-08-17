import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { cocBaseURI } from "../constant.js";
import { Announcement } from "../models/announcement.model.js";
import axios from "axios";


const createAnnouncement = asyncHandler(async (req, res) => {
    const {announcementContent} = req.body

    if(announcementContent == ""){
        throw new ApiError(400, "Announcement must not be empty")
    }
    
    const playerInfo = await axios.get(`${cocBaseURI}/players/${encodeURIComponent(req.user.tag)}`,

        {
            headers: {
                "Authorization" : `Bearer ${process.env.COC_ACCESS_TOKEN}`
            }
        }
    ).catch(error => {
        throw new ApiError(error.request.res.statusCode, error.request.res.statusMessage)
    })

    if(!(playerInfo.data.role == "coLeader" || playerInfo.data.role == "leader")){
        throw new ApiError(403, "Only Leader or a Co-Leader can make an announcement")
    }

    const announcement = await Announcement.create(
        {
            user: req.user._id,
            announcement: announcementContent
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, announcement, true, "Announcement made!")
    )




    
})


const getAllAnnouncements = asyncHandler(async (req, res) => {
    const announcements = await Announcement.find().populate("user", "tag")

    if(!announcements){
        throw new ApiError(300, "No announcements are made yet")
    }

    return res.status(202)
    .json(new ApiResponse(202, announcements, true, "Announcements fetched successfully"))
    
})

export {
    createAnnouncement,
    getAllAnnouncements
}