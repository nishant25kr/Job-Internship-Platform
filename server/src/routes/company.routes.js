import { Router } from "express";
import {
    registerCompany,
    loginCompany,
    logoutCompany,
    currentCompany
} from "../controllers/company.controllers.js"
import { verifyCompanyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(registerCompany);
router.route("/login").post(loginCompany);
router.route("/logout").post(verifyCompanyJWT,logoutCompany);
router.route("/current-company").get(verifyCompanyJWT,currentCompany);


export default router;