import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
import { cocBaseURI } from "../constant.js";


const PlayerInfo = asyncHandler(async (req, res) => {
    const {tag} = req.params

    if(tag === ""){
        throw new ApiError(400, "Tag is required")
    }

    const playerInfo = await axios.get(`${cocBaseURI}/players/${encodeURIComponent(tag)}`, 
        {
            headers: {
                "Authorization" : `Bearer ${process.env.COC_ACCESS_TOKEN}`
            }
        }
    ).catch(error => {
        throw new ApiError(error.request?.res.statusCode, error.request?.res.statusMessage)
    })


    return res.status(201).json(
        new ApiResponse(201, playerInfo.data, true, "Player info fetched successfully")
    )
})

const ClanInfo = asyncHandler( async (req, res) => {
    const {tag} = req.params

    if(tag === ""){
        throw new ApiError(400, "Clan tag must not empty")
    }

    const clanInfo = await axios.get(`${cocBaseURI}/clans/${encodeURIComponent(tag)}`, 
        {
            headers: {
                "Authorization" : `Bearer ${process.env.COC_ACCESS_TOKEN}`
            }
        }
    ).catch(error => {
        throw new ApiError(error.request?.res.statusCode, error.request?.res.statusMessage)
    })

    return res.status(201).json(
        new ApiResponse(201, clanInfo.data, true, "Clan info fetched successfully")
    )
})


export {
    PlayerInfo,
    ClanInfo
}