import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  updateUserDetail,
  currentUser,
  loginwithOauth
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/oauth-login").post(loginwithOauth);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/changePassword").post(verifyJWT, changePassword);
router.route("/updateUserDetail").post(verifyJWT, updateUserDetail);
router.route("/currentUser").get(verifyJWT, currentUser);

export default router;
