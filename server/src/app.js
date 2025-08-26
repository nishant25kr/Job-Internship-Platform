import express, { json } from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (origin.includes("localhost:5173")) return callback(null, true);

    if (origin === "https://job-internship-platform.vercel.app") return callback(null, true);

    if (/\.vercel\.app$/.test(origin)) return callback(null, true);

    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true
}));


app.get('/', (req, res) => {
  res.send(`Hello this is backend from job board`)
})

// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'https://job-internship-platform.vercel.app',
//     'https://job-internship-platform-git-main-nishant25krs-projects.vercel.app',
//     'https://job-internship-platform-tvyszvbd9-nishant25krs-projects.vercel.app'
//   ],
//   credentials: true
// }))

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