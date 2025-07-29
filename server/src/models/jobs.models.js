import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"JobName is required"]
    },
    title:{
        type:String,
        required:[true,"JobTitle is required"]
    },
    description:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true,
        enum:["Remote","Onsite"]
    },
    place:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    }



},{timestamps:true})

export const Job = mongoose.model("Job",jobSchema);