import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import axios from "axios";
import { clanTag, cocBaseURI } from "../constant.js";


const options  = {
    httpOnly: true,
    secure: true
}
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await  user.generateAccessToken();
        const refreshToken = await  user.generateRefreshToken();
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, error.message)
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {tag, password, coctoken} = req.body
    

    if(
        [tag, password, coctoken].some((item) => item.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({tag})
    if(existedUser){
        throw new ApiError(409, "User already exists")
    }
    const encodedTag = encodeURIComponent(tag)
    // const myAxiosIP = await axios.get("https://api.ipify.org/")
    // console.log(myAxiosIP)

    const playerInfo = await axios.get(`https://api.clashofclans.com/v1/players/${encodedTag}`, 
        {
            headers: {
                "Authorization" : `Bearer ${process.env.COC_ACCESS_TOKEN}`
            }
        }
    ).catch(error => {
    
        throw new ApiError(error.request?.res.statusCode, error.request?.res.statusMessage)
    })
   

    if(playerInfo.data.clan.tag !== clanTag){
        throw new ApiError(409, "Player is not in our clan, Access denied" )
    }

    const verifiedPlayer =  await axios.post(`${cocBaseURI}/players/${encodedTag}/verifytoken`,
        {"token" : coctoken.trim()},
        {
            headers: {
                "Authorization" : `Bearer ${process.env.COC_ACCESS_TOKEN}`
            }
        }
        );
        
        if(!verifiedPlayer){
            throw new ApiError(400, "API Token is incorrect")
        }

    if(verifiedPlayer.data.status === "invalid"){
            throw new ApiError(400, "API token is incorrect or expired")
    }

    const user = await User.create({
        tag: playerInfo.data.tag,
        password: password.trim(),
        role: playerInfo.data.role
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(new ApiResponse(200, createdUser))

})

const loginUser = asyncHandler(async (req, res) => {

    const {tag, password} = req.body

    if(
        [tag, password].some((field) => field.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({tag: tag})

    if(!user){
        throw new ApiError(400, "User does not exist")
    }
    
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(400, "Password is incorrect")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, loggedInUser, true)
    )

})


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: true
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, true))


})


const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, true)
    )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
}