import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


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
        default:"User"
    }


},{timestamps:true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password =await bcrypt.hash(this.password,5);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){

    return jwt.sign(
        {
          
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export default mongoose.model("User",userSchema)