import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

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


companySchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password =await bcrypt.hash(this.password,5);
    next();
})

companySchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

companySchema.methods.generateAccessToken = function(){

    return jwt.sign(
        {
          
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

companySchema.methods.generateRefreshToken = function(){
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

export default mongoose.model('Company',companySchema);