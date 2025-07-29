import { User } from '../models/User.models';
import { ApiError } from '../utils/ApiResponse'
import {asyncHandller} from '../utils/asyncHandler.js'
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandller(async (req,res,next)=>{
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new ApiError(401,"Token is not there");
        }

        const decondedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decondedToken?._id).select("-password -refreshToken")

        if(!user){
            throw ApiError(401,"User not found, Invalid accesstoken");
        }

        req.user = user
        next()

    } catch (error) {
        throw new ApiError(
                401,
                "Invalid token"
        )
        
    }
})