import mongoose from "mongoose"

const companySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    phone:{
        type:Number,
        required:true
    },
    companyPhoto:{
        type:String
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    refreshToken:{
        type:String
    },

},{timestamps:true})

export const Company = mongoose.model('Company',companySchema);