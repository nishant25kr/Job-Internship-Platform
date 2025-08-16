import dotenv from "dotenv";
dotenv.config();  

import connectDB1 from "./db/db.js";
import { app } from "./app.js"

connectDB1()
.then(()=>{
    app.listen(`${process.env.PORT}` || 8000, ()=>{
        console.log(`Server is running at port:${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("DB connection failed: ",error)
})


