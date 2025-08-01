import { Router } from "express";
import {
    createJob,
    getallJob
} from "../controllers/jobs.controllers.js"
import { verifyCompanyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/create-jobs").post(verifyCompanyJWT,createJob);
router.route("/getall-jobs").get(getallJob);


export default router;