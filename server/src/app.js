import express, { json } from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express();

app.get('/',(req,res)=>{
    // res.send("hello")
    res.send(`Hello this is backend from job board`)
})

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes
// import userRouter from './routes/user.routes.js'



//router declation
// app.use("/api/v1/users", userRouter)




export { app }