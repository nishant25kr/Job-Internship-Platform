import { Router } from "express";
import {
    createJob,
    getallJob,
    getAppliedJob
} from "../controllers/jobs.controllers.js"
import { verifyCompanyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/create-jobs").post(verifyCompanyJWT,createJob);
router.route("/getall-jobs").get(getallJob);
router.route("/getjobs/:jobId").get(getAppliedJob);


export default router;