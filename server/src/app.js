import express, { json } from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello this is backend from job board`)
})

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// routes
import userRoute from "./routes/user.routes.js"
import companyRoute from "./routes/company.routes.js"
import jobsRoute from "./routes/jobs.routes.js"
import applicationRoute from "./routes/application.routes.js"



//router declation
app.use("/api/users", userRoute)
app.use("/api/company", companyRoute)
app.use("/api/jobs", jobsRoute)
app.use("/api/application", applicationRoute)


export { app }