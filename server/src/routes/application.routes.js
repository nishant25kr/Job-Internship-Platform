import { Router } from "express";
import {
    createApplication,
    deleteApplication,
    getAllApplicants,
    getApplication

} from "../controllers/application.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/create/a/:jobId").post(verifyJWT, createApplication);
router.route("/delete/a/:applicationId").post(verifyJWT, deleteApplication);
router.route("/get-application").get(verifyJWT, getApplication);
router.route("/get-application/:jobid").get(getAllApplicants);


export default router;