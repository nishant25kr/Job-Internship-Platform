import { Router } from "express";
import {
    createApplication,
    deleteApplication
} from "../controllers/application.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/create/a/:jobId").post(verifyJWT,createApplication);
router.route("/delete/a/:applicationId").post(verifyJWT,deleteApplication);


export default router;