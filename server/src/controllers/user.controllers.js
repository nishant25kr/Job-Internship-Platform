import mongoose from "mongoose";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken"

const registerUser = asyncHandler(async(req,res)=>{
    
    const {username, email, fullname, password} = req.body;

    if(username === ""){
        throw new ApiError(400,"username is empty")
    }
    if(email === ""){
        throw new ApiError(400,"username is empty")
    }
    if(fullname === ""){
        throw new ApiError(400,"username is empty")
    }
    if(password === ""){
        throw new ApiError(400,"username is empty")
    }

    const existUser = await User.findOne({
        $or:[{username},{email}]
    })

    // console.log(existUser)

    if(existUser){
        throw new ApiError(404,"User already exist jnjn");
    }

    const user = await User.create({
        username : username,
        email,
        fullname,
        password

    })

    const usercreate = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!usercreate){
        throw new ApiError(500, "Something went wrong while registring the user");
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            user,
            "User created successfully"
        )
    )



})



export{
    registerUser
}