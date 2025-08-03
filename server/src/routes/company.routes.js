import { Router } from "express";
import {
    registerCompany,
    loginCompany,
    logoutCompany,
    currentCompany,
    updateCompanyDetail
} from "../controllers/company.controllers.js"
import { verifyCompanyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(registerCompany);
router.route("/login").post(loginCompany);
router.route("/logout").post(verifyCompanyJWT,logoutCompany);
router.route("/current-company").get(verifyCompanyJWT,currentCompany);
router.route("/update-company").post(verifyCompanyJWT,updateCompanyDetail);


export default router;