import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,

    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    profilePhoto:{
        type:String
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    refreshToken:{
        type:String
    },
    userType:{
        type:String,
        enum:["User","Company"]
    }


},{timestamps:true})

export const User = mongoose.model("User",userSchema)