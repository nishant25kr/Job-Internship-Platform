import { Router } from "express";
import {
    createApplication,
    deleteApplication,
    getApplication

} from "../controllers/application.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/create/a/:jobId").post(verifyJWT,createApplication);
router.route("/delete/a/:applicationId").post(verifyJWT,deleteApplication);
router.route("/get-Application").post(verifyJWT,getApplication);


export default router;